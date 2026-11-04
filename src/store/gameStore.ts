import { create } from 'zustand';
import {
  CharacterState,
  InventoryItem,
  GardenPlot,
  PlacedAbodeObject,
  AlchemyBatchState,
  QualityType,
} from '../types/game';
import { db } from '../db/gameDb';
import { ALCHEMY_RECIPES, ABODE_CATALOG } from '../data/gameData';

interface GameStore {
  character: CharacterState;
  inventory: InventoryItem[];
  garden: GardenPlot[];
  abodeObjects: PlacedAbodeObject[];
  notification: string | null;
  activeTab: 'hud' | 'inventory' | 'alchemy' | 'abode' | 'garden' | null;

  // Build Mode state
  isBuildMode: boolean;
  selectedDefId: string | null;
  buildRotation: number;

  // Alchemy Batch state
  alchemyBatch: AlchemyBatchState;

  // Actions
  initGame: () => Promise<void>;
  setNotification: (msg: string | null) => void;
  setActiveTab: (tab: 'hud' | 'inventory' | 'alchemy' | 'abode' | 'garden' | null) => void;
  toggleMeditation: () => void;
  tickCultivation: (deltaSeconds: number) => void;
  attemptBreakthrough: () => { success: boolean; message: string };

  // Garden Actions
  tickGarden: (deltaSeconds: number) => void;
  plantSeed: (plotId: number, seedItem: InventoryItem) => void;
  waterPlot: (plotId: number) => void;
  harvestPlot: (plotId: number) => void;

  // Abode / Build Mode Actions
  toggleBuildMode: () => void;
  setSelectedDefId: (defId: string | null) => void;
  rotateBuildObject: () => void;
  placeAbodeObject: (x: number, y: number, z: number) => boolean;
  removeAbodeObject: (id: string) => void;

  // Alchemy Actions
  startAlchemyBatch: (recipeId: string) => boolean;
  adjustHeat: (delta: number) => void;
  advanceAlchemyPhase: () => void;
  cancelAlchemy: () => void;

  // Data persistence
  exportSaveData: () => string;
  importSaveData: (jsonStr: string) => Promise<boolean>;
}

const DEFAULT_CHARACTER: CharacterState = {
  id: 'main_character',
  name: 'Hàn Lập',
  realm: 'PHÀM NHÂN',
  realmLevel: 0,
  cultivation: 0,
  cultivationThreshold: 100, // T(1) = 100
  qi: 30,
  maxQi: 50,
  meridianStability: 75,
  mindState: 80,
  spiritSense: 10,
  fatigue: 10,
  affinity: 'WOOD',
  alchemyMastery: 1,
  coins: 80,
  lastOnlineTimestamp: Date.now(),
  isMeditating: false,
};

const INITIAL_INVENTORY: InventoryItem[] = [
  { id: '1', defId: 'herb_thanh_diep', name: 'Thanh Diệp Thảo', type: 'HERB', quantity: 6, description: 'Linh thảo sơ cấp tính mát, chứa chút linh khí.' },
  { id: '2', defId: 'dew_linh_lo', name: 'Linh Tuyền Lộ', type: 'MATERIAL', quantity: 5, description: 'Giọt sương sớm đọng trên phiến đá linh mạch.' },
  { id: '3', defId: 'seed_thanh_diep', name: 'Hạt Giống Thanh Diệp', type: 'SEED', quantity: 4, description: 'Có thể gieo trên linh điền trong động phủ.' },
  { id: '4', defId: 'herb_suong_thao', name: 'Sương Thảo', type: 'HERB', quantity: 4, description: 'Thảo mộc thanh lương, dùng luyện Hồi Khí Đan.' },
  { id: '5', defId: 'seed_suong_thao', name: 'Hạt Giống Sương Thảo', type: 'SEED', quantity: 2, description: 'Hạt giống linh thảo ưa ẩm mát.' },
];

// Initial 4 plots positioned on the soil area
const INITIAL_GARDEN: GardenPlot[] = Array.from({ length: 4 }, (_, i) => {
  const row = Math.floor(i / 2);
  const col = i % 2;
  return {
    id: i,
    unlocked: true,
    x: 6 + col * 2.2,
    z: -3 + row * 2.2,
    seedId: null,
    seedName: null,
    plantedAt: null,
    growthDuration: 30, // 30s test demo
    progress: 0,
    moisture: 70,
    harvestReady: false,
  };
});

const DEFAULT_BATCH: AlchemyBatchState = {
  active: false,
  recipe: null,
  phase: 'PREPARATION',
  currentTemp: 25,
  targetTemp: 55,
  heatScore: 70,
  stability: 80,
  resultQuality: null,
  resultPillName: null,
};

export const useGameStore = create<GameStore>((set, get) => ({
  character: DEFAULT_CHARACTER,
  inventory: INITIAL_INVENTORY,
  garden: INITIAL_GARDEN,
  abodeObjects: [
    {
      id: 'init_cauldron',
      defId: 'obj_cauldron',
      name: 'Đan Lô Sơ Cấp',
      x: -4.5,
      y: 0,
      z: -2,
      rotationY: 0,
    },
  ],
  notification: null,
  activeTab: null,

  isBuildMode: false,
  selectedDefId: null,
  buildRotation: 0,
  alchemyBatch: DEFAULT_BATCH,

  setNotification: (msg) => {
    set({ notification: msg });
    if (msg) {
      setTimeout(() => {
        if (get().notification === msg) set({ notification: null });
      }, 4000);
    }
  },

  setActiveTab: (tab) => set({ activeTab: tab }),

  initGame: async () => {
    try {
      const savedChar = await db.character.get('main_character');
      const now = Date.now();

      if (savedChar) {
        // Offline calculation (Lazy settlement)
        const elapsedHours = (now - savedChar.lastOnlineTimestamp) / (1000 * 3600);
        const effectiveHours = Math.min(Math.max(0, elapsedHours), 8);
        
        if (effectiveHours > 0.05) {
          const offlineGain = Math.floor(0.7 * 8 * effectiveHours);
          const newCultivation = Math.min(
            savedChar.cultivation + offlineGain,
            savedChar.cultivationThreshold
          );
          savedChar.cultivation = newCultivation;
          savedChar.lastOnlineTimestamp = now;
          await db.character.put(savedChar);
          set({
            character: savedChar,
            notification: `Bế quan kết thúc: Rời mạng ${(effectiveHours).toFixed(1)}h, lĩnh ngộ +${offlineGain} Tu Vi!`,
          });
        } else {
          savedChar.lastOnlineTimestamp = now;
          await db.character.put(savedChar);
          set({ character: savedChar });
        }
      } else {
        await db.character.put(DEFAULT_CHARACTER);
        await db.inventory.bulkPut(INITIAL_INVENTORY);
        await db.garden.bulkPut(INITIAL_GARDEN);
        set({ notification: 'Chào mừng đạo hữu nhập thế cầu đạo!' });
      }

      const items = await db.inventory.toArray();
      if (items.length > 0) set({ inventory: items });
      const plots = await db.garden.toArray();
      if (plots.length > 0) set({ garden: plots });
      const abodes = await db.abodeObjects.toArray();
      if (abodes.length > 0) set({ abodeObjects: abodes });

    } catch (err) {
      console.error('Failed to init IndexedDB:', err);
    }
  },

  toggleMeditation: () => {
    const { character, setNotification } = get();
    const isMeditating = !character.isMeditating;
    const updated = { ...character, isMeditating };
    set({ character: updated });
    db.character.put(updated);
    setNotification(isMeditating ? 'Bắt đầu tọa thiền tĩnh tâm...' : 'Thu công hoàn tất.');
  },

  tickCultivation: (deltaSeconds: number) => {
    const { character } = get();
    if (!character.isMeditating) return;

    const baseGainPerSecond = 0.6; // ~36 tu vi / phút
    const gain = baseGainPerSecond * deltaSeconds;
    const nextCultivation = Math.min(
      character.cultivation + gain,
      character.cultivationThreshold
    );

    const updated = {
      ...character,
      cultivation: nextCultivation,
      qi: Math.min(character.maxQi, character.qi + 0.2 * deltaSeconds),
      lastOnlineTimestamp: Date.now(),
    };

    set({ character: updated });
    if (Math.random() < 0.05) {
      db.character.put(updated);
    }
  },

  attemptBreakthrough: () => {
    const { character } = get();
    if (character.cultivation < character.cultivationThreshold) {
      return { success: false, message: 'Tu vi chưa viên mãn, chưa thể cảm ứng thiên cơ!' };
    }

    if (character.meridianStability < 60) {
      return { success: false, message: 'Kinh mạch bất ổn (<60), cưỡng ép đột phá dễ tẩu hỏa nhập ma!' };
    }

    let newRealm: CharacterState['realm'] = character.realm;
    let newLevel = character.realmLevel + 1;
    let nextThreshold = Math.floor(100 * Math.pow(1.8, newLevel));

    if (character.realm === 'PHÀM NHÂN') {
      newRealm = 'LUYỆN KHÍ';
      newLevel = 1;
      nextThreshold = 180;
    }

    const updated: CharacterState = {
      ...character,
      realm: newRealm,
      realmLevel: newLevel,
      cultivation: 0,
      cultivationThreshold: nextThreshold,
      maxQi: character.maxQi + 30,
      qi: character.maxQi + 30,
      meridianStability: Math.min(100, character.meridianStability + 10),
      isMeditating: false,
    };

    set({ character: updated });
    db.character.put(updated);

    return {
      success: true,
      message: `Thiên địa cộng minh! Đột phá thành công ${newRealm} tầng ${newLevel}!`,
    };
  },

  // Garden Logic
  tickGarden: (deltaSeconds: number) => {
    const { garden } = get();
    let changed = false;

    const updatedGarden = garden.map((plot) => {
      if (!plot.seedId || plot.harvestReady) return plot;

      changed = true;
      // Decay moisture slowly
      const newMoisture = Math.max(0, plot.moisture - 0.2 * deltaSeconds);
      // Growth speed affected by moisture
      const growthRate = newMoisture > 20 ? 1 : 0.4;
      const progressGain = (deltaSeconds / plot.growthDuration) * 100 * growthRate;
      const newProgress = Math.min(100, plot.progress + progressGain);

      return {
        ...plot,
        moisture: newMoisture,
        progress: newProgress,
        harvestReady: newProgress >= 100,
      };
    });

    if (changed) {
      set({ garden: updatedGarden });
      if (Math.random() < 0.05) {
        db.garden.bulkPut(updatedGarden);
      }
    }
  },

  plantSeed: (plotId: number, seedItem: InventoryItem) => {
    const { garden, inventory, setNotification } = get();
    const plot = garden.find((p) => p.id === plotId);
    if (!plot) return;
    if (plot.seedId) {
      setNotification('Ô đất này đã có hạt giống đang gieo!');
      return;
    }

    // Deduct seed from inventory
    const updatedInventory = inventory
      .map((item) => (item.id === seedItem.id ? { ...item, quantity: item.quantity - 1 } : item))
      .filter((item) => item.quantity > 0);

    const updatedPlots = garden.map((p) => {
      if (p.id !== plotId) return p;
      return {
        ...p,
        seedId: seedItem.defId,
        seedName: seedItem.name.replace('Hạt Giống ', ''),
        plantedAt: Date.now(),
        growthDuration: seedItem.defId.includes('suong') ? 45 : 30, // seconds
        progress: 0,
        moisture: 80,
        harvestReady: false,
      };
    });

    set({ garden: updatedPlots, inventory: updatedInventory });
    db.garden.bulkPut(updatedPlots);
    db.inventory.clear().then(() => db.inventory.bulkPut(updatedInventory));
    setNotification(`Đã gieo ${seedItem.name} vào linh điền!`);
  },

  waterPlot: (plotId: number) => {
    const { garden, setNotification } = get();
    const updated = garden.map((p) => (p.id === plotId ? { ...p, moisture: 100 } : p));
    set({ garden: updated });
    db.garden.bulkPut(updated);
    setNotification('Đã tưới nước linh tuyền, độ ẩm đạt mức cao nhất!');
  },

  harvestPlot: (plotId: number) => {
    const { garden, inventory, setNotification } = get();
    const plot = garden.find((p) => p.id === plotId);
    if (!plot || !plot.harvestReady || !plot.seedId) return;

    // Herb target mapping
    const herbName = plot.seedName || 'Thanh Diệp Thảo';
    const herbDefId = plot.seedId.replace('seed_', 'herb_');
    const yieldAmount = Math.floor(1 + Math.random() * 2); // 1 - 2 linh thảo

    // Add to inventory
    const existing = inventory.find((it) => it.defId === herbDefId);
    let updatedInventory: InventoryItem[];
    if (existing) {
      updatedInventory = inventory.map((it) =>
        it.defId === herbDefId ? { ...it, quantity: it.quantity + yieldAmount } : it
      );
    } else {
      updatedInventory = [
        ...inventory,
        {
          id: String(Date.now()),
          defId: herbDefId,
          name: herbName,
          type: 'HERB',
          quantity: yieldAmount,
          description: 'Linh thảo tươi mới vừa thu hái tại linh điền.',
        },
      ];
    }

    // Reset plot
    const updatedGarden = garden.map((p) => {
      if (p.id !== plotId) return p;
      return {
        ...p,
        seedId: null,
        seedName: null,
        plantedAt: null,
        progress: 0,
        moisture: 50,
        harvestReady: false,
      };
    });

    set({ garden: updatedGarden, inventory: updatedInventory });
    db.garden.bulkPut(updatedGarden);
    db.inventory.clear().then(() => db.inventory.bulkPut(updatedInventory));
    setNotification(`Thu hoạch thành công: +${yieldAmount} ${herbName}!`);
  },

  // Build Mode
  toggleBuildMode: () => {
    const { isBuildMode } = get();
    set({
      isBuildMode: !isBuildMode,
      selectedDefId: !isBuildMode ? ABODE_CATALOG[0].defId : null,
      activeTab: !isBuildMode ? 'abode' : null,
    });
  },

  setSelectedDefId: (defId) => set({ selectedDefId: defId }),

  rotateBuildObject: () => {
    const { buildRotation } = get();
    set({ buildRotation: (buildRotation + Math.PI / 2) % (Math.PI * 2) });
  },

  placeAbodeObject: (x, _y, z) => {
    const { selectedDefId, character, abodeObjects, buildRotation, setNotification } = get();
    if (!selectedDefId) return false;

    const def = ABODE_CATALOG.find((c) => c.defId === selectedDefId);
    if (!def) return false;

    if (character.coins < def.costCoins) {
      setNotification(`Không đủ linh thạch vụn! Cần ${def.costCoins} 💎.`);
      return false;
    }

    const newObj: PlacedAbodeObject = {
      id: `obj_${Date.now()}`,
      defId: def.defId,
      name: def.name,
      x: Math.round(x * 2) / 2, // Snap grid 0.5m
      y: 0,
      z: Math.round(z * 2) / 2,
      rotationY: buildRotation,
    };

    const updatedObjects = [...abodeObjects, newObj];
    const updatedChar = { ...character, coins: character.coins - def.costCoins };

    set({ abodeObjects: updatedObjects, character: updatedChar });
    db.abodeObjects.put(newObj);
    db.character.put(updatedChar);
    setNotification(`Bố trí thành công ${def.name} vào động phủ!`);
    return true;
  },

  removeAbodeObject: (id: string) => {
    const { abodeObjects, setNotification } = get();
    const target = abodeObjects.find((o) => o.id === id);
    if (!target) return;

    const updated = abodeObjects.filter((o) => o.id !== id);
    set({ abodeObjects: updated });
    db.abodeObjects.delete(id);
    setNotification(`Đã thu hồi ${target.name}.`);
  },

  // Alchemy System
  startAlchemyBatch: (recipeId: string) => {
    const { inventory, character, setNotification } = get();
    const recipe = ALCHEMY_RECIPES.find((r) => r.id === recipeId);
    if (!recipe) return false;

    if (character.alchemyMastery < recipe.requiredMastery) {
      setNotification(`Trình độ đan đạo chưa đủ (Yêu cầu cấp ${recipe.requiredMastery})!`);
      return false;
    }

    // Check ingredients
    for (const req of recipe.ingredients) {
      const invItem = inventory.find((i) => i.defId === req.defId);
      if (!invItem || invItem.quantity < req.quantity) {
        setNotification(`Thiếu nguyên liệu: ${req.name} (cần ${req.quantity})!`);
        return false;
      }
    }

    // Deduct ingredients
    const updatedInventory = inventory
      .map((item) => {
        const req = recipe.ingredients.find((r) => r.defId === item.defId);
        return req ? { ...item, quantity: item.quantity - req.quantity } : item;
      })
      .filter((i) => i.quantity > 0);

    set({
      inventory: updatedInventory,
      activeTab: 'alchemy',
      alchemyBatch: {
        active: true,
        recipe,
        phase: 'HEATING',
        currentTemp: 25,
        targetTemp: recipe.optimalFireTemp,
        heatScore: 70,
        stability: 85,
        resultQuality: null,
        resultPillName: null,
      },
    });

    db.inventory.clear().then(() => db.inventory.bulkPut(updatedInventory));
    setNotification(`Đã khai lò! Bắt đầu điều phối hỏa hầu mẻ ${recipe.name}.`);
    return true;
  },

  adjustHeat: (delta: number) => {
    const { alchemyBatch } = get();
    if (!alchemyBatch.active || alchemyBatch.phase !== 'HEATING') return;

    const nextTemp = Math.max(0, Math.min(100, alchemyBatch.currentTemp + delta));
    const target = alchemyBatch.targetTemp;
    const diff = Math.abs(nextTemp - target);

    // Heat score: higher when closer to target temp
    const newScore = Math.max(20, Math.min(100, Math.floor(100 - diff * 1.5)));

    set({
      alchemyBatch: {
        ...alchemyBatch,
        currentTemp: nextTemp,
        heatScore: newScore,
      },
    });
  },

  advanceAlchemyPhase: () => {
    const { alchemyBatch, character, inventory, setNotification } = get();
    if (!alchemyBatch.active || !alchemyBatch.recipe) return;

    if (alchemyBatch.phase === 'HEATING') {
      // Transition to condensation
      set({
        alchemyBatch: {
          ...alchemyBatch,
          phase: 'CONDENSATION',
        },
      });
      setNotification('Dược lực đã dung hợp hoàn toàn! Tiến vào pha Ngưng Đan.');
    } else if (alchemyBatch.phase === 'CONDENSATION') {
      // Calculate quality using GDD Formula:
      // S = clamp(0, 100, 35 + 0.25P + 0.25H + 0.15M - 0.20D + jitter)
      const P = 75; // Ingredient purity
      const H = alchemyBatch.heatScore; // Fire control score
      const M = character.alchemyMastery * 20; // Mastery bonus
      const D = 5; // Deviation
      const jitter = (Math.random() - 0.5) * 6; // +/- 3
      const score = Math.max(0, Math.min(100, Math.floor(35 + 0.25 * P + 0.25 * H + 0.15 * M - 0.2 * D + jitter)));

      let quality: QualityType | 'HỎNG MẺ' = 'HẠ PHẨM';
      if (score < 35) quality = 'HỎNG MẺ';
      else if (score < 55) quality = 'HẠ PHẨM';
      else if (score < 75) quality = 'TRUNG PHẨM';
      else if (score < 90) quality = 'THƯỢNG PHẨM';
      else quality = 'CỰC PHẨM';

      const pillName = `${alchemyBatch.recipe.name} (${quality})`;

      // If not ruined, grant pill to inventory
      let updatedInv = [...inventory];
      if (quality !== 'HỎNG MẺ') {
        const targetDefId = alchemyBatch.recipe.targetPillDefId;
        const existing = updatedInv.find((i) => i.defId === targetDefId && i.quality === quality);
        if (existing) {
          updatedInv = updatedInv.map((i) => (i === existing ? { ...i, quantity: i.quantity + 1 } : i));
        } else {
          updatedInv.push({
            id: String(Date.now()),
            defId: targetDefId,
            name: alchemyBatch.recipe.name,
            type: 'PILL',
            quantity: 1,
            quality,
            description: `Đan dược vừa luyện thành đạt phẩm chất ${quality}.`,
          });
        }
      }

      // Mastery increase
      const updatedChar = {
        ...character,
        alchemyMastery: Math.min(10, character.alchemyMastery + 0.2),
      };

      set({
        inventory: updatedInv,
        character: updatedChar,
        alchemyBatch: {
          ...alchemyBatch,
          phase: 'RESULT',
          resultQuality: quality,
          resultPillName: pillName,
        },
      });

      db.inventory.clear().then(() => db.inventory.bulkPut(updatedInv));
      db.character.put(updatedChar);
      setNotification(`Xuất lò thành công! Thu được ${pillName}.`);
    }
  },

  cancelAlchemy: () => {
    set({
      alchemyBatch: DEFAULT_BATCH,
      activeTab: null,
    });
  },

  exportSaveData: () => {
    const { character, inventory, garden, abodeObjects } = get();
    const data = {
      version: '1.1',
      exportedAt: new Date().toISOString(),
      character,
      inventory,
      garden,
      abodeObjects,
    };
    return JSON.stringify(data, null, 2);
  },

  importSaveData: async (jsonStr: string) => {
    try {
      const data = JSON.parse(jsonStr);
      if (!data.character) throw new Error('File save không hợp lệ!');
      
      await db.character.put(data.character);
      if (data.inventory) await db.inventory.bulkPut(data.inventory);
      if (data.garden) await db.garden.bulkPut(data.garden);
      if (data.abodeObjects) await db.abodeObjects.bulkPut(data.abodeObjects);

      set({
        character: data.character,
        inventory: data.inventory || [],
        garden: data.garden || [],
        abodeObjects: data.abodeObjects || [],
        notification: 'Khôi phục dữ liệu tu đạo thành công!',
      });
      return true;
    } catch (e) {
      console.error(e);
      return false;
    }
  },
}));
