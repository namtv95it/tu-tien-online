import { create } from 'zustand';
import { CharacterState, InventoryItem, GardenPlot, AbodeObject } from '../types/game';
import { db } from '../db/gameDb';

interface GameStore {
  character: CharacterState;
  inventory: InventoryItem[];
  garden: GardenPlot[];
  abodeObjects: AbodeObject[];
  notification: string | null;
  activeTab: 'hud' | 'inventory' | 'alchemy' | 'abode' | null;

  // Actions
  initGame: () => Promise<void>;
  setNotification: (msg: string | null) => void;
  setActiveTab: (tab: 'hud' | 'inventory' | 'alchemy' | 'abode' | null) => void;
  toggleMeditation: () => void;
  tickCultivation: (deltaSeconds: number) => void;
  attemptBreakthrough: () => { success: boolean; message: string };
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
  qi: 20,
  maxQi: 50,
  meridianStability: 75,
  mindState: 80,
  spiritSense: 10,
  fatigue: 10,
  affinity: 'WOOD',
  alchemyMastery: 1,
  coins: 50, // 50 linh thạch vụn ban đầu
  lastOnlineTimestamp: Date.now(),
  isMeditating: false,
};

const INITIAL_INVENTORY: InventoryItem[] = [
  { id: '1', defId: 'herb_thanh_diep', name: 'Thanh Diệp Thảo', type: 'HERB', quantity: 6, description: 'Linh thảo sơ cấp tính mát, chứa chút linh khí.' },
  { id: '2', defId: 'dew_linh_lo', name: 'Linh Tuyền Lộ', type: 'MATERIAL', quantity: 4, description: 'Giọt sương sớm đọng trên phiến đá linh mạch.' },
  { id: '3', defId: 'seed_thanh_diep', name: 'Hạt Giống Thanh Diệp', type: 'SEED', quantity: 3, description: 'Có thể gieo trên linh điền trong động phủ.' },
  { id: '4', defId: 'item_bo_doan', name: 'Bồ Đoàn Trúc', type: 'FURNITURE', quantity: 1, description: 'Vật dụng tu hành, ngồi lên giúp tĩnh tâm tụ khí.' },
];

const INITIAL_GARDEN: GardenPlot[] = Array.from({ length: 12 }, (_, i) => ({
  id: i,
  unlocked: i < 4, // 4 ô ban đầu
  seedId: null,
  seedName: null,
  plantedAt: null,
  growthDuration: 60, // 60s cho bản test demo
  moisture: 60,
  harvestReady: false,
}));

export const useGameStore = create<GameStore>((set, get) => ({
  character: DEFAULT_CHARACTER,
  inventory: INITIAL_INVENTORY,
  garden: INITIAL_GARDEN,
  abodeObjects: [],
  notification: null,
  activeTab: null,

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
        const effectiveHours = Math.min(Math.max(0, elapsedHours), 8); // Tối đa 8 giờ offline
        
        if (effectiveHours > 0.05) { // trên 3 phút offline
          // G_offline = 0.7 * R_base * hours * E_dong_phu
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
        // First time initialization
        await db.character.put(DEFAULT_CHARACTER);
        await db.inventory.bulkPut(INITIAL_INVENTORY);
        await db.garden.bulkPut(INITIAL_GARDEN);
        set({ notification: 'Chào mừng đạo hữu nhập thế cầu đạo!' });
      }

      // Load inventory & garden
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

    // G_active = 10 * E_linh_khi * E_cong_phap * E_tam_canh
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
    // Throttle save
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

  exportSaveData: () => {
    const { character, inventory, garden, abodeObjects } = get();
    const data = {
      version: '1.0',
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

