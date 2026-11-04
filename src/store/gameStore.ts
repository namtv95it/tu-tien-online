import { create } from 'zustand';
import {
  CharacterState,
  MobileTab,
  MarketItem,
  AlchemyRecipeDef,
  InventoryItem,
  Quest,
  Technique,
  MailMessage,
  ModalType,
} from '../types/game';
import { db } from '../db/gameDb';
import { soundManager } from '../utils/audio';

interface GameStore {
  character: CharacterState;
  activeTab: MobileTab;
  notification: string | null;
  activeModal: ModalType;

  // Inventory / Kho Chứa
  inventory: InventoryItem[];

  // Techniques / Công Pháp
  techniques: Technique[];

  // Quests & Events
  quests: Quest[];
  eventGiftClaimed: boolean;

  // Mail
  mailList: MailMessage[];

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
  allMarketItems: MarketItem[];
  featuredItem: MarketItem;

  // Modal Actions
  openModal: (modal: ModalType) => void;
  closeModal: () => void;

  // Navigation & Toasts
  setActiveTab: (tab: MobileTab) => void;
  setNotification: (msg: string | null) => void;

  // Tu Luyện actions
  vanKhi: () => void;
  toggleBeQuan: () => void;
  thamNgo: () => void;
  attemptBreakthrough: () => { success: boolean; message: string };
  selectTechnique: (id: string) => void;

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
  openStallModal: (category: 'PILL' | 'HERB' | 'WEAPON' | 'MANUAL') => void;
  buyMarketItem: (item: MarketItem) => void;
  buyFeaturedItem: () => void;
  sellItem: (id: string, count?: number) => void;

  // Kho Chứa / Inventory actions
  useItem: (id: string) => void;

  // Động Phủ Facilities
  upgradeSpiritArray: () => void;
  feedKoi: () => void;

  // Quests & Events
  claimQuest: (id: string) => void;
  claimEventGift: () => void;

  // Mail
  claimMail: (id: string) => void;

  // Settings
  isBGMOn: boolean;
  toggleBGM: () => void;
  toggleSound: () => void;
  resetGame: () => Promise<void>;

  // Game Loop
  initGame: () => Promise<void>;
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
  spiritArrayLevel: 1,
  lastOnlineTimestamp: Date.now(),
  soundEnabled: true,
};

const INITIAL_INVENTORY: InventoryItem[] = [
  {
    id: 'inv_moc_linh_hoa',
    name: 'Mộc Linh Hoa',
    type: 'HERB',
    rarity: 'Hạ',
    count: 15,
    description: 'Linh hoa ngậm tinh hoa đất trời, nguyên liệu luyện chế Tụ Khí Đan.',
    effect: 'Dược liệu luyện đan',
    icon: '🌸',
  },
  {
    id: 'inv_han_bang_thao',
    name: 'Hàn Băng Thảo',
    type: 'HERB',
    rarity: 'Trung',
    count: 8,
    description: 'Thảo dược sinh trưởng nơi hàn đàm, mang hàn khí tinh thuần.',
    effect: 'Dược liệu luyện đan',
    icon: '❄️',
  },
  {
    id: 'inv_bach_nien_sam',
    name: 'Bách Niên Sâm',
    type: 'HERB',
    rarity: 'Thượng',
    count: 4,
    description: 'Nhân sâm trăm năm hấp thu linh mạch, đại bổ nguyên khí.',
    effect: 'Dược liệu luyện đan',
    icon: '🥕',
  },
  {
    id: 'inv_tu_khi_dan',
    name: 'Tụ Khí Đan',
    type: 'PILL',
    rarity: 'Trung',
    count: 3,
    description: 'Đan dược cô đọng linh khí thiên địa, hỗ trợ gia tăng tu vi nhanh chóng.',
    effect: 'Tăng +2.000 Tu Vi lập tức',
    icon: '💊',
  },
  {
    id: 'inv_trang_the_dan',
    name: 'Tráng Thể Đan',
    type: 'PILL',
    rarity: 'Trung',
    count: 2,
    description: 'Bồi dưỡng gân cốt, giải trừ mệt mỏi, lập tức hồi phục thể lực.',
    effect: 'Hồi phục +50 Thể Lực',
    icon: '🏺',
  },
  {
    id: 'inv_thanh_tam_dan',
    name: 'Thanh Tâm Đan',
    type: 'PILL',
    rarity: 'Thượng',
    count: 1,
    description: 'Tịnh hóa tâm ma, làm sáng tâm cảnh, tăng tỷ lệ đột phá.',
    effect: 'Tăng +15% tỷ lệ đột phá',
    icon: '🔮',
  },
  {
    id: 'inv_thanh_phong_kiem',
    name: 'Thanh Phong Kiếm',
    type: 'WEAPON',
    rarity: 'Trung',
    count: 1,
    description: 'Thanh phong phất liễu, kiếm khí như gió thoảng, pháp bảo hộ thân cơ bản.',
    effect: 'Tăng +10% hiệu suất vận khí',
    icon: '🗡️',
  },
  {
    id: 'inv_truong_xuan_cong',
    name: 'Trường Xuân Công',
    type: 'MANUAL',
    rarity: 'Hạ',
    count: 1,
    description: 'Bí kíp mộc hệ nhập môn, tuần hoàn sinh sinh bất tức.',
    effect: 'Hồi phục thể lực tự nhiên +15%',
    icon: '📜',
  },
];

const INITIAL_TECHNIQUES: Technique[] = [
  {
    id: 'tech_truong_xuan',
    name: 'Trường Xuân Công',
    element: 'Mộc',
    description: 'Công pháp mộc hệ chính tông, sinh cơ dồi dào, tâm tính bình hòa.',
    buff: 'Hồi phục thể lực & tu vi tự nhiên +15%',
    unlocked: true,
  },
  {
    id: 'tech_quy_tuc',
    name: 'Quy Tức Quyết',
    element: 'Thủy',
    description: 'Mô phỏng rùa thiêng ẩn mình ngưng khí, giảm hao tổn thể chất tối đa.',
    buff: 'Tăng thời gian bế quan offline lên 12h, giảm 20% hao thể lực',
    unlocked: true,
  },
  {
    id: 'tech_thai_hu',
    name: 'Thái Hư Kiếm Điển',
    element: 'Kim',
    description: 'Kiếm ý ngưng tụ hư không, linh khí sắc bén như thần binh.',
    buff: 'Vận khí thủ công nhận thêm +50% Tu Vi (+180/lần)',
    unlocked: false,
  },
  {
    id: 'tech_cuu_chuyen',
    name: 'Cửu Chuyển Huyền Công',
    element: 'Hỏa',
    description: 'Đạo gia huyền công chín lần tôi luyện, hỏa hầu thông thiên.',
    buff: 'Tăng tỷ lệ luyện ra đan dược Thượng phẩm +25%',
    unlocked: false,
  },
];

const INITIAL_QUESTS: Quest[] = [
  {
    id: 'q_main_1',
    title: 'Tu luyện Luyện Khí tầng 3',
    description: 'Tích tụ linh khí đạt cảnh giới Luyện Khí tầng 3 để củng cố đạo cơ.',
    type: 'MAIN',
    progress: 2,
    maxProgress: 3,
    completed: false,
    claimed: false,
    rewardSpiritStones: 2000,
    rewardJadeTokens: 50,
  },
  {
    id: 'q_daily_1',
    title: 'Chăm sóc Vườn Linh Điền',
    description: 'Tưới nước hoặc bón linh thạch cho linh thảo 1 lần.',
    type: 'DAILY',
    progress: 1,
    maxProgress: 1,
    completed: true,
    claimed: false,
    rewardSpiritStones: 500,
  },
  {
    id: 'q_daily_2',
    title: 'Luyện chế đan dược',
    description: 'Mở lò luyện thành công 1 mẻ linh đan.',
    type: 'DAILY',
    progress: 0,
    maxProgress: 1,
    completed: false,
    claimed: false,
    rewardSpiritStones: 800,
  },
  {
    id: 'q_daily_3',
    title: 'Vận khí đại chu thiên',
    description: 'Thực hiện vận khí tụ linh ít nhất 3 lần.',
    type: 'DAILY',
    progress: 2,
    maxProgress: 3,
    completed: false,
    claimed: false,
    rewardSpiritStones: 400,
  },
];

const INITIAL_MAILS: MailMessage[] = [
  {
    id: 'mail_1',
    sender: 'Tông Môn Chưởng Môn',
    title: 'Lễ Mừng Tân Đệ Tử Nhập Môn',
    content: 'Chào mừng đạo hữu bước chân vào con đường tầm đạo. Tông môn gửi tặng chút linh thạch làm lộ phí ban đầu.',
    date: 'Hôm nay',
    read: false,
    claimed: false,
    rewardSpiritStones: 1500,
    rewardJadeTokens: 100,
  },
  {
    id: 'mail_2',
    sender: 'Dược Vương Các',
    title: 'Khảo thí Luyện Đan Sư',
    content: 'Dược Vương Các khai mở đại điển đan đạo. Tặng đạo hữu dược liệu thử sức ngưng đan.',
    date: 'Hôm qua',
    read: true,
    claimed: true,
    rewardSpiritStones: 500,
  },
];

const MARKET_CATALOG: MarketItem[] = [
  // PILLS
  {
    id: 'dan_truc_co',
    name: 'Đan Trúc Cơ',
    description: 'Bảo đan ngũ phẩm, phá tan bình cảnh đột phá Trúc Cơ.',
    originalPrice: 60000,
    discountPrice: 48000,
    category: 'PILL',
    rarity: 'Cực',
    icon: '🔮',
    bought: false,
  },
  {
    id: 'dan_tu_khi',
    name: 'Tụ Khí Đan (Lọ 5 viên)',
    description: 'Đan dược bổ khí, tăng mạnh tu vi cho tu sĩ Luyện Khí.',
    originalPrice: 3000,
    discountPrice: 2400,
    category: 'PILL',
    rarity: 'Trung',
    icon: '💊',
    bought: false,
  },
  {
    id: 'dan_trang_the',
    name: 'Tráng Thể Đan (Lọ 3 viên)',
    description: 'Hồi phục thể lực nhanh chóng, tăng cường gân cốt.',
    originalPrice: 2000,
    discountPrice: 1500,
    category: 'PILL',
    rarity: 'Trung',
    icon: '🏺',
    bought: false,
  },
  // HERBS
  {
    id: 'herb_giong_moc_linh',
    name: 'Hạt Giống Mộc Linh',
    description: 'Hạt giống linh hoa thượng hạng, dễ gieo trồng trong linh điền.',
    originalPrice: 800,
    discountPrice: 500,
    category: 'HERB',
    rarity: 'Hạ',
    icon: '🌱',
    bought: false,
  },
  {
    id: 'herb_nguyen_lieu_sam',
    name: 'Bách Niên Sâm',
    description: 'Nhân sâm trăm năm dùng cho các đan phương cao cấp.',
    originalPrice: 2500,
    discountPrice: 1800,
    category: 'HERB',
    rarity: 'Thượng',
    icon: '🥕',
    bought: false,
  },
  {
    id: 'herb_linh_chi_do',
    name: 'Xích Huyết Chi',
    description: 'Linh chi màu máu mọc ở vách đá, cực kỳ quý hiếm.',
    originalPrice: 4000,
    discountPrice: 3200,
    category: 'HERB',
    rarity: 'Thượng',
    icon: '🍄',
    bought: false,
  },
  // WEAPONS
  {
    id: 'wp_thanh_phong',
    name: 'Thanh Phong Kiếm',
    description: 'Bảo kiếm phi kiếm sơ cấp, tăng tốc độ hấp thu linh khí.',
    originalPrice: 8000,
    discountPrice: 6500,
    category: 'WEAPON',
    rarity: 'Trung',
    icon: '🗡️',
    bought: false,
  },
  {
    id: 'wp_huyen_thiet_giap',
    name: 'Huyền Thiết Bào',
    description: 'Đạo bào dệt từ sợi huyền thiết, bảo hộ linh căn an toàn.',
    originalPrice: 12000,
    discountPrice: 9500,
    category: 'WEAPON',
    rarity: 'Thượng',
    icon: '🥋',
    bought: false,
  },
  // MANUALS
  {
    id: 'mn_thai_hu',
    name: 'Thái Hư Kiếm Điển',
    description: 'Điển tịch bí truyền kiếm tu, mở khóa công pháp Thái Hư.',
    originalPrice: 25000,
    discountPrice: 18000,
    category: 'MANUAL',
    rarity: 'Cực',
    icon: '📜',
    bought: false,
  },
  {
    id: 'mn_cuu_chuyen',
    name: 'Cửu Chuyển Huyền Công',
    description: 'Công pháp tôi luyện lò đan và hỏa hầu tối thượng.',
    originalPrice: 35000,
    discountPrice: 28000,
    category: 'MANUAL',
    rarity: 'Cực',
    icon: '📕',
    bought: false,
  },
];

const INITIAL_RECIPES: AlchemyRecipeDef[] = [
  {
    id: 'tu_khi_dan',
    name: 'Tụ Khí Đan',
    realmRequirement: 'Luyện Khí • Trúc Cơ',
    description: 'Tụ linh khí thiên địa, gia tăng tu vi. Dùng để đột phá từ Luyện Khí lên Trúc Cơ.',
    effect: '+2.000 Tu vi',
    successRate: 85,
    fireLevel: 7,
    ingredients: [
      { name: 'Nhân Sâm Linh', required: 2, current: 4, icon: '🥕' },
      { name: 'Tụ Linh Thảo', required: 3, current: 15, icon: '🌸' },
      { name: 'Linh Thạch', required: 4, current: 50, icon: '💎' },
      { name: 'Linh Chi', required: 1, current: 3, icon: '🍄' },
    ],
  },
  {
    id: 'trang_the_dan',
    name: 'Tráng Thể Đan',
    realmRequirement: 'Tăng khí huyết',
    description: 'Bồi bổ gân cốt, hồi phục 50 Thể lực lập tức.',
    effect: '+50 Thể lực',
    successRate: 80,
    fireLevel: 6,
    ingredients: [
      { name: 'Hàn Băng Thảo', required: 2, current: 8, icon: '❄️' },
      { name: 'Linh Thạch', required: 3, current: 50, icon: '💎' },
    ],
  },
  {
    id: 'thanh_tam_dan',
    name: 'Thanh Tâm Đan',
    realmRequirement: 'Tịnh tâm ngưng thần',
    description: 'Xua tan tạp niệm, thanh tẩy tâm cảnh, tăng tỷ lệ thiên kiếp.',
    effect: 'Tâm cảnh +30, Tỷ lệ +15%',
    successRate: 90,
    fireLevel: 5,
    ingredients: [
      { name: 'Bách Niên Sâm', required: 1, current: 4, icon: '🥕' },
      { name: 'Linh Thảo', required: 2, current: 15, icon: '🌸' },
    ],
  },
];

export const useGameStore = create<GameStore>((set, get) => ({
  character: DEFAULT_CHARACTER,
  activeTab: 'dong-phu',
  notification: null,
  activeModal: 'NONE',

  inventory: INITIAL_INVENTORY,
  techniques: INITIAL_TECHNIQUES,
  quests: INITIAL_QUESTS,
  eventGiftClaimed: false,
  mailList: INITIAL_MAILS,

  gardenPlots: [
    {
      id: 1,
      name: 'Mộc Linh Hoa',
      stage: 'Sinh trưởng (70%)',
      progress: 70,
      timeLeftSeconds: 272,
      moisture: 72,
      yieldEstimate: 'x6 ~ 9 Thảo dược',
      ready: false,
    },
    {
      id: 2,
      name: 'Kim Ngân Thảo',
      stage: 'Chín muồi (100%)',
      progress: 100,
      timeLeftSeconds: 0,
      moisture: 65,
      yieldEstimate: 'x4 ~ 6 Thảo dược',
      ready: true,
    },
    {
      id: 3,
      name: 'Thiên Huyết Chi',
      stage: 'Nảy mầm (35%)',
      progress: 35,
      timeLeftSeconds: 520,
      moisture: 80,
      yieldEstimate: 'x3 ~ 5 Thảo dược',
      ready: false,
    },
    {
      id: 4,
      name: 'Bách Niên Sâm',
      stage: 'Chín muồi (100%)',
      progress: 100,
      timeLeftSeconds: 0,
      moisture: 60,
      yieldEstimate: 'x2 ~ 3 Thảo dược',
      ready: true,
    },
    {
      id: 5,
      name: 'U Lan Hoa',
      stage: 'Sinh trưởng (50%)',
      progress: 50,
      timeLeftSeconds: 380,
      moisture: 75,
      yieldEstimate: 'x5 ~ 8 Thảo dược',
      ready: false,
    },
    {
      id: 6,
      name: 'Thanh Phong Thảo',
      stage: 'Nảy mầm (20%)',
      progress: 20,
      timeLeftSeconds: 650,
      moisture: 85,
      yieldEstimate: 'x4 ~ 7 Thảo dược',
      ready: false,
    },
    {
      id: 7,
      name: 'Bích Diệp Đằng',
      stage: 'Chín muồi (100%)',
      progress: 100,
      timeLeftSeconds: 0,
      moisture: 70,
      yieldEstimate: 'x3 ~ 6 Thảo dược',
      ready: true,
    },
    {
      id: 8,
      name: 'Hoàng Tinh Căn',
      stage: 'Sinh trưởng (85%)',
      progress: 85,
      timeLeftSeconds: 120,
      moisture: 68,
      yieldEstimate: 'x2 ~ 4 Thảo dược',
      ready: false,
    },
  ],

  selectedRecipeId: 'tu_khi_dan',
  recipes: INITIAL_RECIPES,
  fireIntensity: 7,
  alchemyBatchCount: 1,

  marketCategory: 'PILL',
  allMarketItems: MARKET_CATALOG,
  featuredItem: MARKET_CATALOG[0],
  isBGMOn: false,

  openStallModal: (category) => {
    soundManager.playClick();
    set({
      marketCategory: category,
      activeModal: 'MARKET_STALL',
    });
  },

  openModal: (modal) => {
    soundManager.playClick();
    set({ activeModal: modal });
  },
  closeModal: () => {
    soundManager.playClick();
    set({ activeModal: 'NONE' });
  },

  setActiveTab: (tab) => {
    soundManager.playClick();
    set({ activeTab: tab });
  },

  setNotification: (msg) => {
    set({ notification: msg });
    if (msg) {
      setTimeout(() => {
        if (get().notification === msg) set({ notification: null });
      }, 3200);
    }
  },

  initGame: async () => {
    try {
      const saved = await db.character.get('main_character');
      const now = Date.now();

      if (saved) {
        soundManager.setEnabled(saved.soundEnabled ?? true);
        const hours = (now - saved.lastOnlineTimestamp) / (1000 * 3600);
        const cappedHours = Math.min(Math.max(0, hours), saved.activeTechnique === 'Quy Tức Quyết' ? 12 : 8);

        if (cappedHours > 0.05) {
          const rate = 600 * (1 + (saved.spiritArrayLevel || 1) * 0.1);
          const gain = Math.floor(rate * cappedHours);
          const nextCult = Math.min(saved.cultivationThreshold, saved.cultivation + gain);
          saved.cultivation = nextCult;
          saved.lastOnlineTimestamp = now;
          await db.character.put(saved);
          set({
            character: saved,
            notification: `Bế quan offline hoàn tất (${cappedHours.toFixed(1)}h): Nhận +${gain} Tu vi!`,
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

  // Tu Luyện actions
  vanKhi: () => {
    const { character, setNotification } = get();
    soundManager.playQiFlow();

    let gain = 120;
    if (character.activeTechnique === 'Thái Hư Kiếm Điển') gain = 180;

    const nextCult = Math.min(character.cultivationThreshold, character.cultivation + gain);
    const updated = {
      ...character,
      cultivation: nextCult,
      stamina: Math.max(0, character.stamina - (character.activeTechnique === 'Quy Tức Quyết' ? 1 : 2)),
    };
    set({ character: updated });
    db.character.put(updated);
    setNotification(`Vận Khí đại chu thiên: Hấp thu linh khí +${gain} Tu Vi!`);

    // Update quest progress
    const { quests } = get();
    const updatedQuests = quests.map((q) => {
      if (q.id === 'q_daily_3') {
        const next = Math.min(q.maxProgress, q.progress + 1);
        return { ...q, progress: next, completed: next >= q.maxProgress };
      }
      return q;
    });
    set({ quests: updatedQuests });
  },

  toggleBeQuan: () => {
    const { character, setNotification } = get();
    soundManager.playClick();
    const isMeditating = !character.isMeditating;
    const updated = { ...character, isMeditating };
    set({ character: updated });
    db.character.put(updated);
    setNotification(isMeditating ? 'Đã nhập định Bế Quan tu luyện liên tục!' : 'Đã xuất quan!');
  },

  thamNgo: () => {
    const { character, setNotification } = get();
    soundManager.playQiFlow();
    const gain = 350;
    const nextCult = Math.min(character.cultivationThreshold, character.cultivation + gain);
    const updated = {
      ...character,
      cultivation: nextCult,
      stamina: Math.max(0, character.stamina - 10),
    };
    set({ character: updated });
    db.character.put(updated);
    setNotification('Tham Ngộ thành công: Lĩnh ngộ thiên đạo +350 Tu Vi!');
  },

  attemptBreakthrough: () => {
    const { character } = get();
    if (character.cultivation < character.cultivationThreshold) {
      soundManager.playClick();
      return { success: false, message: `Tu vi chưa viên mãn (${character.cultivation}/${character.cultivationThreshold}), chưa thể đột phá!` };
    }

    soundManager.playBreakthrough();
    const nextLevel = character.realmLevel + 1;
    const updated: CharacterState = {
      ...character,
      realmLevel: nextLevel,
      cultivation: 0,
      cultivationThreshold: character.cultivationThreshold * 2,
      level: character.level + 1,
      maxStamina: character.maxStamina + 20,
      stamina: character.maxStamina + 20,
    };

    set({ character: updated });
    db.character.put(updated);

    // Update main quest
    const { quests } = get();
    const updatedQuests = quests.map((q) => {
      if (q.id === 'q_main_1') {
        return { ...q, progress: nextLevel, completed: nextLevel >= q.maxProgress };
      }
      return q;
    });
    set({ quests: updatedQuests });

    return { success: true, message: `Thiên kiếp vượt qua! Đột phá thành công Luyện Khí Tầng ${nextLevel}!` };
  },

  selectTechnique: (id) => {
    const { techniques, character, setNotification } = get();
    const tech = techniques.find((t) => t.id === id);
    if (!tech || !tech.unlocked) {
      setNotification('Công pháp này chưa lĩnh ngộ!');
      return;
    }
    soundManager.playClick();
    const updated = { ...character, activeTechnique: tech.name };
    set({ character: updated });
    db.character.put(updated);
    setNotification(`Đã chuyển sang công pháp: ${tech.name} (${tech.buff})`);
  },

  // Linh Điền actions
  waterPlot: (id) => {
    const { gardenPlots, setNotification, quests } = get();
    soundManager.playWaterDrop();
    const updated = gardenPlots.map((p) => (p.id === id ? { ...p, moisture: Math.min(100, p.moisture + 25) } : p));
    set({ gardenPlots: updated });
    setNotification('Tưới nước Linh Tuyền ngọt mát, độ ẩm tăng lên tối ưu!');

    // Update daily quest
    const updatedQuests = quests.map((q) => {
      if (q.id === 'q_daily_1') return { ...q, progress: 1, completed: true };
      return q;
    });
    set({ quests: updatedQuests });
  },

  fertilizePlot: (id) => {
    const { gardenPlots, character, setNotification } = get();
    if (character.spiritStones < 500) {
      soundManager.playClick();
      setNotification('Không đủ linh thạch (cần 500 linh thạch)!');
      return;
    }
    soundManager.playClick();
    const updatedPlots = gardenPlots.map((p) => {
      if (p.id !== id) return p;
      const nextProg = Math.min(100, p.progress + 20);
      return {
        ...p,
        progress: nextProg,
        stage: nextProg >= 100 ? 'Chín muồi (100%)' : `Sinh trưởng (${nextProg}%)`,
        ready: nextProg >= 100,
        timeLeftSeconds: Math.max(0, p.timeLeftSeconds - 180),
      };
    });

    const updatedChar = { ...character, spiritStones: character.spiritStones - 500 };
    set({ gardenPlots: updatedPlots, character: updatedChar });
    db.character.put(updatedChar);
    setNotification('Bón Linh Thạch thành công: Linh thảo lớn mạnh thêm +20%!');
  },

  harvestPlot: (id) => {
    const { gardenPlots, character, inventory, setNotification, quests } = get();
    const plot = gardenPlots.find((p) => p.id === id);
    if (!plot || !plot.ready) return;

    soundManager.playCoin();
    const updatedPlots = gardenPlots.map((p) => {
      if (p.id !== id) return p;
      return {
        ...p,
        stage: 'Đã gieo mầm (10%)',
        progress: 10,
        timeLeftSeconds: 300,
        moisture: 70,
        ready: false,
      };
    });

    // Add herbs to inventory
    const existingHerb = inventory.find((i) => i.name.includes('Linh') || i.type === 'HERB');
    let updatedInv = [...inventory];
    if (existingHerb) {
      updatedInv = updatedInv.map((i) => (i.id === existingHerb.id ? { ...i, count: i.count + 5 } : i));
    }

    const updatedChar = { ...character, spiritStones: character.spiritStones + 2000 };
    set({ gardenPlots: updatedPlots, character: updatedChar, inventory: updatedInv });
    db.character.put(updatedChar);
    setNotification(`Thu hoạch thành công ${plot.name}! Nhận +5 Thảo Dược & +2.000 Linh Thạch.`);

    // Complete daily quest
    const updatedQuests = quests.map((q) => {
      if (q.id === 'q_daily_1') return { ...q, progress: 1, completed: true };
      return q;
    });
    set({ quests: updatedQuests });
  },

  // Luyện Đan actions
  setSelectedRecipe: (id) => {
    soundManager.playClick();
    set({ selectedRecipeId: id });
  },
  setFireIntensity: (val) => {
    soundManager.playClick();
    set({ fireIntensity: Math.max(1, Math.min(10, val)) });
  },
  setAlchemyBatchCount: (val) => {
    soundManager.playClick();
    set({ alchemyBatchCount: Math.max(1, Math.min(10, val)) });
  },

  startAlchemy: () => {
    const { recipes, selectedRecipeId, character, alchemyBatchCount, inventory, setNotification, quests } = get();
    const recipe = recipes.find((r) => r.id === selectedRecipeId);
    if (!recipe) return;

    soundManager.playAlchemyFire();

    // Add pill to inventory
    let updatedInv = [...inventory];
    const existingPill = updatedInv.find((i) => i.name === recipe.name);
    if (existingPill) {
      updatedInv = updatedInv.map((i) => (i.id === existingPill.id ? { ...i, count: i.count + alchemyBatchCount } : i));
    } else {
      updatedInv.push({
        id: `pill_${recipe.id}_${Date.now()}`,
        name: recipe.name,
        type: 'PILL',
        rarity: 'Thượng',
        count: alchemyBatchCount,
        description: recipe.description,
        effect: recipe.effect,
        icon: '💊',
      });
    }

    const updatedChar = {
      ...character,
      cultivation: Math.min(character.cultivationThreshold, character.cultivation + 2000 * alchemyBatchCount),
    };

    set({ character: updatedChar, inventory: updatedInv });
    db.character.put(updatedChar);
    setNotification(`Luyện chế thành công ${alchemyBatchCount}x ${recipe.name} (Thượng phẩm)! Đã cho vào Kho Chứa.`);

    // Update quest
    const updatedQuests = quests.map((q) => {
      if (q.id === 'q_daily_2') return { ...q, progress: 1, completed: true };
      return q;
    });
    set({ quests: updatedQuests });
  },

  // Phường Thị actions
  setMarketCategory: (cat) => {
    soundManager.playClick();
    set({ marketCategory: cat });
  },

  buyMarketItem: (item) => {
    const { character, inventory, allMarketItems, setNotification, techniques } = get();
    if (item.bought) {
      setNotification('Đã mua món đồ này!');
      return;
    }
    if (character.spiritStones < item.discountPrice) {
      soundManager.playClick();
      setNotification(`Không đủ linh thạch (Cần ${item.discountPrice.toLocaleString()} Linh Thạch)!`);
      return;
    }

    soundManager.playCoin();

    // Deduct currency
    const updatedChar = {
      ...character,
      spiritStones: character.spiritStones - item.discountPrice,
    };

    // Add to inventory
    const updatedInv = [...inventory];
    const existing = updatedInv.find((i) => i.name === item.name);
    if (existing) {
      existing.count += 1;
    } else {
      updatedInv.push({
        id: `inv_${item.id}`,
        name: item.name,
        type: item.category,
        rarity: item.rarity,
        count: 1,
        description: item.description,
        effect: item.category === 'PILL' ? 'Dùng để hồi phục / tăng tu vi' : 'Trang bị / Tu luyện',
        icon: item.icon,
      });
    }

    // If manual, unlock technique
    let updatedTech = [...techniques];
    if (item.category === 'MANUAL') {
      if (item.id === 'mn_thai_hu') {
        updatedTech = updatedTech.map((t) => (t.id === 'tech_thai_hu' ? { ...t, unlocked: true } : t));
      } else if (item.id === 'mn_cuu_chuyen') {
        updatedTech = updatedTech.map((t) => (t.id === 'tech_cuu_chuyen' ? { ...t, unlocked: true } : t));
      }
    }

    // Mark as bought
    const updatedItems = allMarketItems.map((m) => (m.id === item.id ? { ...m, bought: true } : m));

    set({
      character: updatedChar,
      inventory: updatedInv,
      allMarketItems: updatedItems,
      techniques: updatedTech,
    });
    db.character.put(updatedChar);
    setNotification(`Mua thành công ${item.name}! Đã cất vào Kho Chứa.`);
  },

  buyFeaturedItem: () => {
    const { featuredItem, buyMarketItem } = get();
    buyMarketItem(featuredItem);
  },

  sellItem: (id, count = 1) => {
    const { inventory, character, setNotification } = get();
    const item = inventory.find((i) => i.id === id);
    if (!item || item.count < count) return;

    soundManager.playCoin();

    // Selling price based on rarity
    const priceMap: Record<string, number> = {
      'Phàm': 80,
      'Hạ': 150,
      'Trung': 400,
      'Thượng': 1500,
      'Cực': 6000,
    };
    const unitPrice = priceMap[item.rarity] || 100;
    const totalEarned = unitPrice * count;

    const updatedInv = inventory
      .map((i) => (i.id === id ? { ...i, count: i.count - count } : i))
      .filter((i) => i.count > 0);

    const updatedChar = {
      ...character,
      spiritStones: character.spiritStones + totalEarned,
    };

    set({ inventory: updatedInv, character: updatedChar });
    db.character.put(updatedChar);
    setNotification(`Bán ${count}x ${item.name}: Thu về +${totalEarned.toLocaleString()} Linh Thạch!`);
  },

  // Kho Chứa / Use Item
  useItem: (id) => {
    const { inventory, character, setNotification } = get();
    const item = inventory.find((i) => i.id === id);
    if (!item || item.count <= 0) return;

    soundManager.playQiFlow();

    let updatedChar = { ...character };
    let msg = `Đã sử dụng ${item.name}`;

    if (item.name.includes('Tụ Khí Đan')) {
      updatedChar.cultivation = Math.min(updatedChar.cultivationThreshold, updatedChar.cultivation + 2000);
      msg = 'Sử dụng Tụ Khí Đan: Linh khí dâng trào +2.000 Tu Vi!';
    } else if (item.name.includes('Tráng Thể Đan')) {
      updatedChar.stamina = Math.min(updatedChar.maxStamina, updatedChar.stamina + 50);
      msg = 'Sử dụng Tráng Thể Đan: Sinh lực sung mãn +50 Thể Lực!';
    } else if (item.name.includes('Trúc Cơ')) {
      updatedChar.cultivation = updatedChar.cultivationThreshold;
      msg = 'Sử dụng Đan Trúc Cơ: Tu vi lập tức viên mãn 100%! Có thể đột phá ngay.';
    } else if (item.type === 'MANUAL') {
      msg = `Điển tịch ${item.name}: Đã ghi nhớ yếu quyết công pháp vào tâm thức.`;
    }

    const updatedInv = inventory
      .map((i) => (i.id === id ? { ...i, count: i.count - 1 } : i))
      .filter((i) => i.count > 0);

    set({ character: updatedChar, inventory: updatedInv });
    db.character.put(updatedChar);
    setNotification(msg);
  },

  // Động Phủ Facilities
  upgradeSpiritArray: () => {
    const { character, setNotification } = get();
    const cost = (character.spiritArrayLevel || 1) * 2000;
    if (character.spiritStones < cost) {
      soundManager.playClick();
      setNotification(`Không đủ linh thạch (Cần ${cost.toLocaleString()} Linh Thạch)!`);
      return;
    }
    soundManager.playBreakthrough();
    const nextLvl = (character.spiritArrayLevel || 1) + 1;
    const updated = {
      ...character,
      spiritStones: character.spiritStones - cost,
      spiritArrayLevel: nextLvl,
    };
    set({ character: updated });
    db.character.put(updated);
    setNotification(`Trận Tụ Linh nâng cấp thành công lên Cấp ${nextLvl}! Tốc độ tu luyện tăng +${nextLvl * 10}%.`);
  },

  feedKoi: () => {
    const { character, setNotification } = get();
    if (character.stamina < 5) {
      soundManager.playClick();
      setNotification('Thể lực không đủ (cần 5 thể lực)!');
      return;
    }
    soundManager.playWaterDrop();
    const updated = {
      ...character,
      stamina: character.stamina - 5,
      cultivation: Math.min(character.cultivationThreshold, character.cultivation + 80),
      spiritStones: character.spiritStones + 100,
    };
    set({ character: updated });
    db.character.put(updated);
    setNotification('Đàn cá chép vàng nhảy múa mừng rỡ! Tâm cảnh an hòa: +80 Tu vi, +100 Linh thạch.');
  },

  // Quests & Events
  claimQuest: (id) => {
    const { quests, character, setNotification } = get();
    const quest = quests.find((q) => q.id === id);
    if (!quest || !quest.completed || quest.claimed) return;

    soundManager.playCoin();
    const updatedChar = {
      ...character,
      spiritStones: character.spiritStones + quest.rewardSpiritStones,
      jadeTokens: character.jadeTokens + (quest.rewardJadeTokens || 0),
    };

    const updatedQuests = quests.map((q) => (q.id === id ? { ...q, claimed: true } : q));

    set({ character: updatedChar, quests: updatedQuests });
    db.character.put(updatedChar);
    setNotification(`Nhận thưởng nhiệm vụ "${quest.title}": +${quest.rewardSpiritStones.toLocaleString()} Linh Thạch!`);
  },

  claimEventGift: () => {
    const { eventGiftClaimed, character, setNotification } = get();
    if (eventGiftClaimed) {
      setNotification('Đã nhận quà Thất Tịch hôm nay rồi!');
      return;
    }
    soundManager.playCoin();
    const updatedChar = {
      ...character,
      spiritStones: character.spiritStones + 2000,
      jadeTokens: character.jadeTokens + 100,
      goldIngots: character.goldIngots + 20,
    };
    set({ character: updatedChar, eventGiftClaimed: true });
    db.character.put(updatedChar);
    setNotification('Nhận Quà Thất Tịch: +2.000 Linh Thạch, +100 Ngọc Bích, +20 Nguyên Bảo!');
  },

  // Mail
  claimMail: (id) => {
    const { mailList, character, setNotification } = get();
    const mail = mailList.find((m) => m.id === id);
    if (!mail || mail.claimed) return;

    soundManager.playCoin();
    const updatedChar = {
      ...character,
      spiritStones: character.spiritStones + (mail.rewardSpiritStones || 0),
      jadeTokens: character.jadeTokens + (mail.rewardJadeTokens || 0),
    };

    const updatedMails = mailList.map((m) => (m.id === id ? { ...m, claimed: true, read: true } : m));

    set({ character: updatedChar, mailList: updatedMails });
    db.character.put(updatedChar);
    setNotification(`Đã nhận quà đính kèm thư "${mail.title}"!`);
  },

  // Settings
  toggleBGM: () => {
    const isPlaying = soundManager.toggleBGM();
    set({ isBGMOn: isPlaying });
    get().setNotification(isPlaying ? 'Nhạc nền Cổ Phong: Đang phát 🎶' : 'Nhạc nền Cổ Phong: Đã tạm dừng ⏸️');
  },

  toggleSound: () => {
    const { character, setNotification } = get();
    const nextVal = !character.soundEnabled;
    soundManager.setEnabled(nextVal);
    const updated = { ...character, soundEnabled: nextVal };
    set({ character: updated });
    db.character.put(updated);
    setNotification(nextVal ? 'Âm thanh: Đã BẬT' : 'Âm thanh: Đã TẮT');
  },

  resetGame: async () => {
    soundManager.playClick();
    await db.character.clear();
    await db.character.put(DEFAULT_CHARACTER);
    set({
      character: DEFAULT_CHARACTER,
      inventory: INITIAL_INVENTORY,
      techniques: INITIAL_TECHNIQUES,
      quests: INITIAL_QUESTS,
      eventGiftClaimed: false,
      mailList: INITIAL_MAILS,
      activeModal: 'NONE',
      notification: 'Đã thiết lập lại dữ liệu tu tiên từ đầu!',
    });
  },

  // Realtime game loop
  tickGameLoop: (deltaSeconds) => {
    const { character, gardenPlots } = get();
    if (character.isMeditating) {
      let speed = 2;
      if (character.spiritArrayLevel) speed += character.spiritArrayLevel * 0.5;
      const nextCult = Math.min(character.cultivationThreshold, character.cultivation + speed * deltaSeconds);
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
        progress: isReady ? 100 : Math.min(99, Math.floor(((600 - newTime) / 600) * 100)),
        stage: isReady ? 'Chín muồi (100%)' : `Sinh trưởng (${Math.floor(((600 - newTime) / 600) * 100)}%)`,
      };
    });

    set({ gardenPlots: updatedPlots });
  },
}));
