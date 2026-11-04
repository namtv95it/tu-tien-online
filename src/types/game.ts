// Types for 2D Mobile-First Tu Tiên Game matching assets/design

export type MobileTab = 'dong-phu' | 'tu-luyen' | 'luyen-dan' | 'linh-dien' | 'phuong-thi';

export type ItemType = 'HERB' | 'PILL' | 'WEAPON' | 'MANUAL';
export type ItemRarity = 'Phàm' | 'Hạ' | 'Trung' | 'Thượng' | 'Cực';

export interface InventoryItem {
  id: string;
  name: string;
  type: ItemType;
  rarity: ItemRarity;
  count: number;
  description: string;
  effect: string;
  icon: string;
}

export interface CharacterState {
  id: string;
  name: string;
  level: number;
  realm: string; // "Luyện Khí"
  realmLevel: number; // 2
  cultivation: number; // 7200
  cultivationThreshold: number; // 12000
  stamina: number; // 120
  maxStamina: number; // 120
  spiritStones: number; // 56420 (Bạc / Linh thạch)
  jadeTokens: number; // 1280 (Ngọc bích)
  goldIngots: number; // 320 (Kim nguyên bảo)
  activeTechnique: string; // "Trường Xuân Công"
  isMeditating: boolean;
  spiritArrayLevel: number; // 1..5
  lastOnlineTimestamp: number;
  soundEnabled: boolean;
}

export interface MarketItem {
  id: string;
  name: string;
  description: string;
  originalPrice: number;
  discountPrice: number;
  category: ItemType;
  rarity: ItemRarity;
  icon: string;
  bought: boolean;
}

export interface AlchemyRecipeDef {
  id: string;
  name: string;
  realmRequirement: string;
  description: string;
  effect: string;
  successRate: number; // e.g. 85%
  fireLevel: number; // 1..10
  ingredients: { name: string; required: number; current: number; icon: string }[];
}

export interface Quest {
  id: string;
  title: string;
  description: string;
  type: 'MAIN' | 'DAILY';
  progress: number;
  maxProgress: number;
  completed: boolean;
  claimed: boolean;
  rewardSpiritStones: number;
  rewardJadeTokens?: number;
}

export interface Technique {
  id: string;
  name: string;
  element: 'Mộc' | 'Thủy' | 'Kim' | 'Hỏa';
  description: string;
  buff: string;
  unlocked: boolean;
}

export interface MailMessage {
  id: string;
  sender: string;
  title: string;
  content: string;
  date: string;
  read: boolean;
  claimed: boolean;
  rewardSpiritStones?: number;
  rewardJadeTokens?: number;
}

export type ModalType =
  | 'NONE'
  | 'QUESTS'
  | 'EVENT'
  | 'INVENTORY'
  | 'TECHNIQUES'
  | 'SPIRIT_ARRAY'
  | 'KOI_POND'
  | 'MAIL'
  | 'ANNOUNCEMENTS'
  | 'SETTINGS';
