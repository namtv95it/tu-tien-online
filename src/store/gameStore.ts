import { create } from 'zustand';
import {
  CharacterState,
  InventoryItem,
  GardenPlot,
  AbodeFacility,
  AlchemyBatchState,
  MobileTab,
  QualityType,
} from '../types/game';
import { db } from '../db/gameDb';
import { ALCHEMY_RECIPES, ABODE_FACILITIES } from '../data/gameData';

interface GameStore {
  character: CharacterState;
  inventory: InventoryItem[];
  garden: GardenPlot[];
  facilities: AbodeFacility[];
  activeTab: MobileTab;
  notification: string | null;

  // Alchemy Batch state
  alchemyBatch: AlchemyBatchState;

  // Actions
  initGame: () => Promise<void>;
  setActiveTab: (tab: MobileTab) => void;
  setNotification: (msg: string | null) => void;

  // Cultivation
  toggleMeditation: () => void;
  tickGameLoop: (deltaSeconds: number) => void;
  attemptBreakthrough: () => { success: boolean; message: string };

  // Garden
  plantSeed: (plotId: number, seedItem: InventoryItem) => void;
  waterPlot: (plotId: number) => void;
  harvestPlot: (plotId: number) => void;

  // Alchemy
  startAlchemyBatch: (recipeId: string) => boolean;
  adjustHeat: (delta: number) => void;
  advanceAlchemyPhase: () => void;
  cancelAlchemy: () => void;

  // Abode
  buildFacility: (facilityId: string) => boolean;
  upgradeAbodeTier: () => boolean;

  // Inventory & Item usage
  useItem: (item: InventoryItem) => void;

  // Save/Load
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
  alchemyMastery: 1.0,
  coins: 80,
  lastOnlineTimestamp: Date.now(),
  isMeditating: true, // Mặc định tự động tọa thiền thư thái
  abodeTier: 1, // 1: Thảo Lư, 2: Tiểu Động Phủ, 3: Linh Phủ
};

const INITIAL_INVENTORY: InventoryItem[] = [
  { id: '1', defId: 'herb_thanh_diep', name: 'Thanh Diệp Thảo', type: 'HERB', quantity: 6, description: 'Linh thảo sơ cấp tính mát, chứa chút linh khí.' },
  { id: '2', defId: 'dew_linh_lo', name: 'Linh Tuyền Lộ', type: 'MATERIAL', quantity: 5, description: 'Giọt sương sớm đọng trên phiến đá linh mạch.' },
  { id: '3', defId: 'seed_thanh_diep', name: 'Hạt Giống Thanh Diệp', type: 'SEED', quantity: 4, description: 'Có thể gieo trên linh điền trong động phủ.' },
  { id: '4', defId: 'herb_suong_thao', name: 'Sương Thảo', type: 'HERB', quantity: 4, description: 'Thảo mộc thanh lương, dùng luyện Hồi Khí Đan.' },
  { id: '5', defId: 'seed_suong_thao', name: 'Hạt Giống Sương Thảo', type: 'SEED', quantity: 2, description: 'Hạt giống linh thảo ưa ẩm mát.' },
  { id: '6', defId: 'pill_tu_khi', name: 'Tụ Khí Đan (Trung Phẩm)', type: 'PILL', quantity: 2, description: 'Dược lực ôn hòa, uống vào lập tức tăng 30 điểm tu vi!', quality: 'TRUNG PHẨM', effectValue: 30 },
];

const INITIAL_GARDEN: GardenPlot[] = Array.from({ length: 6 }, (_, i) => ({
  id: i,
  unlocked: i < 4, // 4 ô ban đầu mở khóa
  seedId: null,
  seedName: null,
  plantedAt: null,
  growthDuration: 30, // 30s
  progress: 0,
  moisture: 70,
  harvestReady: false,
}));

const DEFAULT_BATCH: AlchemyBatchState = {
  active: false,
  recipe: null,
  phase: 'PREPARATION',
  currentTemp: 25,
  targetTemp: 55,
  heatScore: 70,
  stability: 85,
  resultQuality: null,
  resultPillName: null,
};

export const useGameStore = create<GameStore>((set, get) => ({
  character: DEFAULT_CHARACTER,
  inventory: INITIAL_INVENTORY,
  garden: INITIAL_GARDEN,
  facilities: ABODE_FACILITIES,
  activeTab: 'cultivation',
  notification: null,
  alchemyBatch: DEFAULT_BATCH,

  setNotification: (msg) => {
    set({ notification: msg });
    if (msg) {
      setTimeout(() => {
        if (get().notification === msg) set({ notification: null });
      }, 3500);
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
        const effectiveHours = Math.min(Math.max(0, elapsedHours), 8); // Tối đa 8h bế quan
        
        if (effectiveHours > 0.03) {
          const offlineGain = Math.floor(0.7 * 10 * effectiveHours * (savedChar.abodeTier >= 2 ? 1.2 : 1.0));
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
        await db.facilities.bulkPut(ABODE_FACILITIES);
        set({ notification: 'Chào mừng đạo hữu nhập thế cầu đạo!' });
      }

      const items = await db.inventory.toArray();
      if (items.length > 0) set({ inventory: items });
      const plots = await db.garden.toArray();
      if (plots.length > 0) set({ garden: plots });
      const facs = await db.facilities.toArray();
      if (facs.length > 0) set({ facilities: facs });

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
    setNotification(isMeditating ? 'Nhập định tọa thiền, hấp thu linh khí trời đất...' : 'Thu công xuất định.');
  },

  tickGameLoop: (deltaSeconds: number) => {
    const { character, garden, facilities } = get();
    const hasSpiritWell = facilities.find((f) => f.id === 'fac_stone_well')?.built;
    const hasSpiritArray = facilities.find((f) => f.id === 'fac_spirit_array')?.built;

    // 1. Cultivation Tick
    let updatedChar = { ...character };
    if (character.isMeditating) {
      const baseGainPerSec = 0.8 * (hasSpiritArray ? 1.2 : 1.0); // +tu vi
      const gain = baseGainPerSec * deltaSeconds;
      const nextCultivation = Math.min(
        character.cultivation + gain,
        character.cultivationThreshold
      );
      updatedChar = {
        ...updatedChar,
        cultivation: nextCultivation,
        qi: Math.min(character.maxQi, character.qi + 0.3 * deltaSeconds),
        lastOnlineTimestamp: Date.now(),
      };
    }

    // 2. Garden Tick
    let gardenChanged = false;
    const updatedGarden = garden.map((plot) => {
      if (!plot.seedId || plot.harvestReady) return plot;
      gardenChanged = true;

      // Moisture decay, stone well keeps moisture higher
      const moistureDecay = hasSpiritWell ? 0.08 : 0.25;
      const newMoisture = Math.max(0, plot.moisture - moistureDecay * deltaSeconds);
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

    set({
      character: updatedChar,
      garden: gardenChanged ? updatedGarden : garden,
    });

    // Throttle persistence
    if (Math.random() < 0.05) {
      db.character.put(updatedChar);
      if (gardenChanged) db.garden.bulkPut(updatedGarden);
    }
  },

  attemptBreakthrough: () => {
    const { character } = get();
    if (character.cultivation < character.cultivationThreshold) {
      return { success: false, message: 'Tu vi chưa viên mãn, chưa thể cảm ứng thiên kiếp!' };
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
      maxQi: character.maxQi + 35,
      qi: character.maxQi + 35,
      meridianStability: Math.min(100, character.meridianStability + 10),
      coins: character.coins + 30, // Thưởng đột phá
    };

    set({ character: updated });
    db.character.put(updated);

    return {
      success: true,
      message: `Thiên địa cộng minh! Đạo hữu thuận lợi đột phá ${newRealm} tầng ${newLevel}!`,
    };
  },

  // Garden Actions
  plantSeed: (plotId, seedItem) => {
    const { garden, inventory, setNotification } = get();
    const plot = garden.find((p) => p.id === plotId);
    if (!plot) return;
    if (plot.seedId) {
      setNotification('Ô đất này đang gieo trồng thảo dược!');
      return;
    }

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
        growthDuration: seedItem.defId.includes('suong') ? 45 : 30,
        progress: 0,
        moisture: 80,
        harvestReady: false,
      };
    });

    set({ garden: updatedPlots, inventory: updatedInventory });
    db.garden.bulkPut(updatedPlots);
    db.inventory.clear().then(() => db.inventory.bulkPut(updatedInventory));
    setNotification(`Đã gieo ${seedItem.name} vào ô đất #${plotId + 1}!`);
  },

  waterPlot: (plotId) => {
    const { garden, setNotification } = get();
    const updated = garden.map((p) => (p.id === plotId ? { ...p, moisture: 100 } : p));
    set({ garden: updated });
    db.garden.bulkPut(updated);
    setNotification('Đã tưới nước Linh Tuyền ngọt mát!');
  },

  harvestPlot: (plotId) => {
    const { garden, inventory, setNotification } = get();
    const plot = garden.find((p) => p.id === plotId);
    if (!plot || !plot.harvestReady || !plot.seedId) return;

    const herbName = plot.seedName || 'Thanh Diệp Thảo';
    const herbDefId = plot.seedId.replace('seed_', 'herb_');
    const yieldAmount = Math.floor(1 + Math.random() * 2);

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

  // Alchemy Actions
  startAlchemyBatch: (recipeId) => {
    const { inventory, character, setNotification } = get();
    const recipe = ALCHEMY_RECIPES.find((r) => r.id === recipeId);
    if (!recipe) return false;

    if (character.alchemyMastery < recipe.requiredMastery) {
      setNotification(`Đan đạo chưa đủ (Yêu cầu Cấp ${recipe.requiredMastery})!`);
      return false;
    }

    for (const req of recipe.ingredients) {
      const item = inventory.find((i) => i.defId === req.defId);
      if (!item || item.quantity < req.quantity) {
        setNotification(`Thiếu nguyên liệu: ${req.name} (cần ${req.quantity})!`);
        return false;
      }
    }

    const updatedInventory = inventory
      .map((item) => {
        const req = recipe.ingredients.find((r) => r.defId === item.defId);
        return req ? { ...item, quantity: item.quantity - req.quantity } : item;
      })
      .filter((i) => i.quantity > 0);

    set({
      inventory: updatedInventory,
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
    setNotification(`Khai lò! Bắt đầu điều phối hỏa hầu mẻ ${recipe.name}.`);
    return true;
  },

  adjustHeat: (delta) => {
    const { alchemyBatch } = get();
    if (!alchemyBatch.active || alchemyBatch.phase !== 'HEATING') return;

    const nextTemp = Math.max(0, Math.min(100, alchemyBatch.currentTemp + delta));
    const target = alchemyBatch.targetTemp;
    const diff = Math.abs(nextTemp - target);
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
      set({
        alchemyBatch: { ...alchemyBatch, phase: 'CONDENSATION' },
      });
      setNotification('Dược tính hòa quyện, tiến vào pha Ngưng Đan!');
    } else if (alchemyBatch.phase === 'CONDENSATION') {
      // Quality calculation formula from GDD
      const P = 75;
      const H = alchemyBatch.heatScore;
      const M = character.alchemyMastery * 20;
      const D = 5;
      const jitter = (Math.random() - 0.5) * 6;
      const score = Math.max(0, Math.min(100, Math.floor(35 + 0.25 * P + 0.25 * H + 0.15 * M - 0.2 * D + jitter)));

      let quality: QualityType | 'HỎNG MẺ' = 'HẠ PHẨM';
      if (score < 35) quality = 'HỎNG MẺ';
      else if (score < 55) quality = 'HẠ PHẨM';
      else if (score < 75) quality = 'TRUNG PHẨM';
      else if (score < 90) quality = 'THƯỢNG PHẨM';
      else quality = 'CỰC PHẨM';

      const pillName = `${alchemyBatch.recipe.name} (${quality})`;
      let updatedInv = [...inventory];

      if (quality !== 'HỎNG MẺ') {
        const targetDefId = alchemyBatch.recipe.targetPillDefId;
        const effectVal = targetDefId.includes('tu_khi') ? 35 : targetDefId.includes('hoi_khi') ? 40 : 20;
        const existing = updatedInv.find((i) => i.defId === targetDefId && i.quality === quality);
        if (existing) {
          updatedInv = updatedInv.map((i) => (i === existing ? { ...i, quantity: i.quantity + 1 } : i));
        } else {
          updatedInv.push({
            id: String(Date.now()),
            defId: targetDefId,
            name: `${alchemyBatch.recipe.name}`,
            type: 'PILL',
            quantity: 1,
            quality,
            effectValue: effectVal,
            description: `Đan hoàn phẩm chất ${quality}, dùng trực tiếp để nhận linh lực hoặc tu vi.`,
          });
        }
      }

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
      setNotification(`Đan thành xuất lò: ${pillName}!`);
    }
  },

  cancelAlchemy: () => {
    set({ alchemyBatch: DEFAULT_BATCH });
  },

  // Abode Actions
  buildFacility: (facilityId) => {
    const { facilities, character, setNotification } = get();
    const fac = facilities.find((f) => f.id === facilityId);
    if (!fac || fac.built) return false;

    if (character.coins < fac.cost) {
      setNotification(`Không đủ linh thạch! Cần ${fac.cost} 💎.`);
      return false;
    }

    const updatedFacs = facilities.map((f) => (f.id === facilityId ? { ...f, built: true } : f));
    const updatedChar = { ...character, coins: character.coins - fac.cost };

    set({ facilities: updatedFacs, character: updatedChar });
    db.facilities.bulkPut(updatedFacs);
    db.character.put(updatedChar);
    setNotification(`Kiến thiết thành công ${fac.name}!`);
    return true;
  },

  upgradeAbodeTier: () => {
    const { character, setNotification, garden } = get();
    if (character.abodeTier >= 3) {
      setNotification('Động phủ đã đạt cảnh giới Linh Phủ tối cao!');
      return false;
    }

    const cost = character.abodeTier === 1 ? 100 : 250;
    if (character.coins < cost) {
      setNotification(`Cần ${cost} linh thạch để thăng cấp Động phủ!`);
      return false;
    }

    const nextTier = character.abodeTier + 1;
    const tierName = nextTier === 2 ? 'Tiểu Động Phủ' : 'Linh Phủ';

    // Unlock more garden plots
    const updatedGarden = garden.map((p, idx) => ({
      ...p,
      unlocked: idx < (nextTier === 2 ? 6 : 10),
    }));

    const updatedChar = {
      ...character,
      abodeTier: nextTier,
      coins: character.coins - cost,
      maxQi: character.maxQi + 20,
    };

    set({ character: updatedChar, garden: updatedGarden });
    db.character.put(updatedChar);
    db.garden.bulkPut(updatedGarden);
    setNotification(`Chúc mừng đạo hữu mở rộng cảnh giới lên ${tierName}!`);
    return true;
  },

  // Item usage
  useItem: (item) => {
    const { inventory, character, setNotification } = get();
    if (item.type !== 'PILL') return;

    let updatedChar = { ...character };
    let msg = `Đã dùng ${item.name}!`;

    if (item.defId.includes('tu_khi')) {
      const gain = item.effectValue || 30;
      updatedChar.cultivation = Math.min(
        updatedChar.cultivationThreshold,
        updatedChar.cultivation + gain
      );
      msg = `Uống ${item.name}: Tu vi tăng vọt +${gain}!`;
    } else if (item.defId.includes('hoi_khi')) {
      const gain = item.effectValue || 40;
      updatedChar.qi = Math.min(updatedChar.maxQi, updatedChar.qi + gain);
      msg = `Uống ${item.name}: Linh lực hồi phục +${gain}!`;
    } else if (item.defId.includes('duong_mach')) {
      updatedChar.meridianStability = Math.min(100, updatedChar.meridianStability + 15);
      msg = `Uống ${item.name}: Kinh mạch gia cố thêm +15 ổn định!`;
    } else if (item.defId.includes('tinh_tam')) {
      updatedChar.mindState = Math.min(100, updatedChar.mindState + 20);
      msg = `Uống ${item.name}: Tâm cảnh thanh tịnh +20!`;
    }

    const updatedInventory = inventory
      .map((i) => (i.id === item.id ? { ...i, quantity: i.quantity - 1 } : i))
      .filter((i) => i.quantity > 0);

    set({ character: updatedChar, inventory: updatedInventory });
    db.character.put(updatedChar);
    db.inventory.clear().then(() => db.inventory.bulkPut(updatedInventory));
    setNotification(msg);
  },

  exportSaveData: () => {
    const { character, inventory, garden, facilities } = get();
    const data = {
      version: '2.0-mobile',
      exportedAt: new Date().toISOString(),
      character,
      inventory,
      garden,
      facilities,
    };
    return JSON.stringify(data, null, 2);
  },

  importSaveData: async (jsonStr: string) => {
    try {
      const data = JSON.parse(jsonStr);
      if (!data.character) throw new Error('Dữ liệu save không hợp lệ!');

      await db.character.put(data.character);
      if (data.inventory) await db.inventory.bulkPut(data.inventory);
      if (data.garden) await db.garden.bulkPut(data.garden);
      if (data.facilities) await db.facilities.bulkPut(data.facilities);

      set({
        character: data.character,
        inventory: data.inventory || [],
        garden: data.garden || [],
        facilities: data.facilities || [],
        notification: 'Khôi phục bản lưu thành công!',
      });
      return true;
    } catch (e) {
      console.error(e);
      return false;
    }
  },
}));
