import { create } from 'zustand';
import { CharacterState, MobileTab, MarketItem, AlchemyRecipeDef } from '../types/game';
import { db } from '../db/gameDb';

interface GameStore {
  character: CharacterState;
  activeTab: MobileTab;
  notification: string | null;

  // Linh Điền state
  gardenPlots: {
    id: number;
    name: string;
    stage: string;
    progress: number;
    timeLeftSeconds: number;
    moisture: number;
    yieldEstimate: string;
    ready: boolean;
  }[];

  // Luyện Đan state
  selectedRecipeId: string;
  recipes: AlchemyRecipeDef[];
  fireIntensity: number; // 1..10
  alchemyBatchCount: number;

  // Phường Thị state
  marketCategory: 'PILL' | 'HERB' | 'WEAPON' | 'MANUAL';
  featuredItem: MarketItem;

  // Actions
  initGame: () => Promise<void>;
  setActiveTab: (tab: MobileTab) => void;
  setNotification: (msg: string | null) => void;

  // Tu Luyện actions
  vanKhi: () => void;
  toggleBeQuan: () => void;
  thamNgo: () => void;
  attemptBreakthrough: () => { success: boolean; message: string };

  // Linh Điền actions
  waterPlot: (id: number) => void;
  fertilizePlot: (id: number) => void;
  harvestPlot: (id: number) => void;

  // Luyện Đan actions
  setSelectedRecipe: (id: string) => void;
  setFireIntensity: (val: number) => void;
  setAlchemyBatchCount: (val: number) => void;
  startAlchemy: () => void;

  // Phường Thị actions
  setMarketCategory: (cat: 'PILL' | 'HERB' | 'WEAPON' | 'MANUAL') => void;
  buyFeaturedItem: () => void;

  // Game Loop tick
  tickGameLoop: (deltaSeconds: number) => void;
}

const DEFAULT_CHARACTER: CharacterState = {
  id: 'main_character',
  name: 'Tạ Văn Nam',
  level: 12,
  realm: 'Luyện Khí',
  realmLevel: 2,
  cultivation: 7200,
  cultivationThreshold: 12000,
  stamina: 120,
  maxStamina: 120,
  spiritStones: 56420,
  jadeTokens: 1280,
  goldIngots: 320,
  activeTechnique: 'Trường Xuân Công',
  isMeditating: true,
  lastOnlineTimestamp: Date.now(),
};

const INITIAL_RECIPES: AlchemyRecipeDef[] = [
  {
    id: 'tu_khi_dan',
    name: 'Tụ Khí Đan',
    realmRequirement: 'Luyện Khí • Trúc Cơ',
    description: 'Tụ linh khí thiên địa, gia tăng tu vi. Dùng để đột phá từ Luyện Khí lên Trúc Cơ.',
    effect: '+2000 Tu vi',
    successRate: 85,
    fireLevel: 7,
    ingredients: [
      { name: 'Nhân Sâm Linh', required: 3, current: 12, icon: '🥕' },
      { name: 'Tụ Linh Thảo', required: 5, current: 28, icon: '🌸' },
      { name: 'Linh Thạch', required: 4, current: 36, icon: '💎' },
      { name: 'Linh Chi', required: 2, current: 17, icon: '🍄' },
    ],
  },
  {
    id: 'trang_the_dan',
    name: 'Tráng Thể Đan',
    realmRequirement: 'Tăng khí huyết',
    description: 'Bồi bổ gân cốt, tăng cường thể lực tối đa.',
    effect: '+30 Thể lực vĩnh viễn',
    successRate: 80,
    fireLevel: 6,
    ingredients: [
      { name: 'Huyết Sâm', required: 4, current: 15, icon: '🌿' },
      { name: 'Linh Thạch', required: 5, current: 36, icon: '💎' },
    ],
  },
  {
    id: 'thanh_tam_dan',
    name: 'Thanh Tâm Đan',
    realmRequirement: 'Tịnh tâm ngưng thần',
    description: 'Xua tan tạp niệm, giảm 50% nguy cơ tẩu hỏa.',
    effect: 'Tâm cảnh +30',
    successRate: 90,
    fireLevel: 5,
    ingredients: [
      { name: 'Nguyệt Diệp', required: 3, current: 8, icon: '🍃' },
      { name: 'Bạch Liên', required: 2, current: 6, icon: '🪷' },
    ],
  },
];

export const useGameStore = create<GameStore>((set, get) => ({
  character: DEFAULT_CHARACTER,
  activeTab: 'tu-luyen',
  notification: null,

  gardenPlots: [
    {
      id: 1,
      name: 'Mộc Linh Hoa (Bậc 2)',
      stage: 'Sinh trưởng (70%)',
      progress: 70,
      timeLeftSeconds: 1106, // ~18m26s
      moisture: 72,
      yieldEstimate: 'x6 ~ 9',
      ready: false,
    },
    {
      id: 2,
      name: 'Kim Ngân Thảo',
      stage: 'Chín muồi (100%)',
      progress: 100,
      timeLeftSeconds: 0,
      moisture: 65,
      yieldEstimate: 'x4 ~ 6',
      ready: true,
    },
    {
      id: 3,
      name: 'Thiên Huyết Chi',
      stage: 'Nảy mầm (35%)',
      progress: 35,
      timeLeftSeconds: 2400,
      moisture: 80,
      yieldEstimate: 'x3 ~ 5',
      ready: false,
    },
    {
      id: 4,
      name: 'Hoàng Kim Sâm',
      stage: 'Chín muồi (100%)',
      progress: 100,
      timeLeftSeconds: 0,
      moisture: 60,
      yieldEstimate: 'x2 ~ 3',
      ready: true,
    },
  ],

  selectedRecipeId: 'tu_khi_dan',
  recipes: INITIAL_RECIPES,
  fireIntensity: 7,
  alchemyBatchCount: 1,

  marketCategory: 'PILL',
  featuredItem: {
    id: 'dan_truc_co',
    name: 'Đan Trúc Cơ',
    description: 'Đan dược quý, giúp đột phá Luyện Khí lên Trúc Cơ.',
    originalPrice: 60000,
    discountPrice: 48000,
    category: 'PILL',
    icon: '🔮',
    bought: false,
  },

  setActiveTab: (tab) => set({ activeTab: tab }),

  setNotification: (msg) => {
    set({ notification: msg });
    if (msg) {
      setTimeout(() => {
        if (get().notification === msg) set({ notification: null });
      }, 3000);
    }
  },

  initGame: async () => {
    try {
      const saved = await db.character.get('main_character');
      const now = Date.now();

      if (saved) {
        // Offline calculation
        const hours = (now - saved.lastOnlineTimestamp) / (1000 * 3600);
        const cappedHours = Math.min(Math.max(0, hours), 8);
        if (cappedHours > 0.05) {
          const gain = Math.floor(600 * cappedHours); // ~4800 tu vi cho 8h
          const nextCult = Math.min(saved.cultivationThreshold, saved.cultivation + gain);
          saved.cultivation = nextCult;
          saved.lastOnlineTimestamp = now;
          await db.character.put(saved);
          set({
            character: saved,
            notification: `Bế quan 8 giờ hoàn tất: Nhận +${gain} Tu vi, +240 Linh khí!`,
          });
        } else {
          saved.lastOnlineTimestamp = now;
          await db.character.put(saved);
          set({ character: saved });
        }
      } else {
        await db.character.put(DEFAULT_CHARACTER);
      }
    } catch (e) {
      console.error(e);
    }
  },

  vanKhi: () => {
    const { character, setNotification } = get();
    const gain = 120;
    const nextCult = Math.min(character.cultivationThreshold, character.cultivation + gain);
    const updated = {
      ...character,
      cultivation: nextCult,
      stamina: Math.max(0, character.stamina - 2),
    };
    set({ character: updated });
    db.character.put(updated);
    setNotification('Vận Khí đại chu thiên: Hấp thu linh khí +120 Tu Vi!');
  },

  toggleBeQuan: () => {
    const { character, setNotification } = get();
    const isMeditating = !character.isMeditating;
    const updated = { ...character, isMeditating };
    set({ character: updated });
    db.character.put(updated);
    setNotification(isMeditating ? 'Đã nhập định Bế Quan tu luyện liên tục!' : 'Đã xuất quan!');
  },

  thamNgo: () => {
    const { character, setNotification } = get();
    const gain = 350;
    const nextCult = Math.min(character.cultivationThreshold, character.cultivation + gain);
    const updated = {
      ...character,
      cultivation: nextCult,
      stamina: Math.max(0, character.stamina - 10),
    };
    set({ character: updated });
    db.character.put(updated);
    setNotification('Tham Ngộ thành công: Lĩnh ngộ huyền cơ +350 Tu Vi!');
  },

  attemptBreakthrough: () => {
    const { character } = get();
    if (character.cultivation < character.cultivationThreshold) {
      return { success: false, message: 'Tu vi chưa viên mãn (cần 12.000), chưa thể đột phá!' };
    }

    const updated: CharacterState = {
      ...character,
      realmLevel: character.realmLevel + 1,
      cultivation: 0,
      cultivationThreshold: 24000,
      level: character.level + 1,
      maxStamina: character.maxStamina + 20,
      stamina: character.maxStamina + 20,
    };

    set({ character: updated });
    db.character.put(updated);
    return { success: true, message: `Thiên kiếp vượt qua! Đột phá thành công Luyện Khí Tầng ${updated.realmLevel}!` };
  },

  waterPlot: (id) => {
    const { gardenPlots, setNotification } = get();
    const updated = gardenPlots.map((p) => (p.id === id ? { ...p, moisture: Math.min(100, p.moisture + 25) } : p));
    set({ gardenPlots: updated });
    setNotification('Tưới nước Linh Tuyền ngọt mát, độ ẩm tăng lên tối ưu!');
  },

  fertilizePlot: (id) => {
    const { gardenPlots, character, setNotification } = get();
    if (character.spiritStones < 500) {
      setNotification('Không đủ linh thạch vụn (cần 500 linh thạch)!');
      return;
    }

    const updatedPlots = gardenPlots.map((p) => {
      if (p.id !== id) return p;
      const nextProg = Math.min(100, p.progress + 20);
      return {
        ...p,
        progress: nextProg,
        stage: nextProg >= 100 ? 'Chín muồi (100%)' : `Sinh trưởng (${nextProg}%)`,
        ready: nextProg >= 100,
        timeLeftSeconds: Math.max(0, p.timeLeftSeconds - 600),
      };
    });

    const updatedChar = { ...character, spiritStones: character.spiritStones - 500 };
    set({ gardenPlots: updatedPlots, character: updatedChar });
    db.character.put(updatedChar);
    setNotification('Bón Linh Thạch thành công: Linh thảo thúc đẩy lớn mạnh +20%!');
  },

  harvestPlot: (id) => {
    const { gardenPlots, character, setNotification } = get();
    const plot = gardenPlots.find((p) => p.id === id);
    if (!plot || !plot.ready) return;

    const updatedPlots = gardenPlots.map((p) => {
      if (p.id !== id) return p;
      return {
        ...p,
        stage: 'Đã gieo mầm (10%)',
        progress: 10,
        timeLeftSeconds: 1800,
        moisture: 70,
        ready: false,
      };
    });

    const updatedChar = { ...character, spiritStones: character.spiritStones + 2000 };
    set({ gardenPlots: updatedPlots, character: updatedChar });
    db.character.put(updatedChar);
    setNotification(`Thu hoạch thành công ${plot.name}: Nhận thảo dược & +2.000 Linh thạch!`);
  },

  setSelectedRecipe: (id) => set({ selectedRecipeId: id }),
  setFireIntensity: (val) => set({ fireIntensity: Math.max(1, Math.min(10, val)) }),
  setAlchemyBatchCount: (val) => set({ alchemyBatchCount: Math.max(1, Math.min(10, val)) }),

  startAlchemy: () => {
    const { recipes, selectedRecipeId, character, alchemyBatchCount, setNotification } = get();
    const recipe = recipes.find((r) => r.id === selectedRecipeId);
    if (!recipe) return;

    const updatedChar = {
      ...character,
      cultivation: Math.min(character.cultivationThreshold, character.cultivation + 2000 * alchemyBatchCount),
    };

    set({ character: updatedChar });
    db.character.put(updatedChar);
    setNotification(`Luyện chế thành công ${alchemyBatchCount}x ${recipe.name} (Thượng phẩm)! +${2000 * alchemyBatchCount} Tu vi.`);
  },

  setMarketCategory: (cat) => set({ marketCategory: cat }),

  buyFeaturedItem: () => {
    const { featuredItem, character, setNotification } = get();
    if (featuredItem.bought) {
      setNotification('Đã mua hết giới hạn vật phẩm này hôm nay!');
      return;
    }
    if (character.spiritStones < featuredItem.discountPrice) {
      setNotification(`Không đủ linh thạch (Cần ${featuredItem.discountPrice.toLocaleString()})!`);
      return;
    }

    const updatedChar = {
      ...character,
      spiritStones: character.spiritStones - featuredItem.discountPrice,
    };
    const updatedItem = { ...featuredItem, bought: true };

    set({ character: updatedChar, featuredItem: updatedItem });
    db.character.put(updatedChar);
    setNotification(`Mua thành công ${featuredItem.name}! Dùng để đột phá Trúc Cơ.`);
  },

  tickGameLoop: (deltaSeconds) => {
    const { character, gardenPlots } = get();
    if (character.isMeditating) {
      const nextCult = Math.min(character.cultivationThreshold, character.cultivation + 2 * deltaSeconds);
      set({
        character: {
          ...character,
          cultivation: nextCult,
          lastOnlineTimestamp: Date.now(),
        },
      });
    }

    // Tick garden
    const updatedPlots = gardenPlots.map((plot) => {
      if (plot.ready) return plot;
      const newTime = Math.max(0, plot.timeLeftSeconds - deltaSeconds);
      const isReady = newTime === 0;
      return {
        ...plot,
        timeLeftSeconds: newTime,
        ready: isReady,
        progress: isReady ? 100 : Math.min(99, Math.floor(((1800 - newTime) / 1800) * 100)),
        stage: isReady ? 'Chín muồi (100%)' : `Sinh trưởng (${Math.floor(((1800 - newTime) / 1800) * 100)}%)`,
      };
    });

    set({ gardenPlots: updatedPlots });
  },
}));
