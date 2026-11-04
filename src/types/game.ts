// Types for 2D Mobile-First Tu Tiên Game matching assets/design

export type MobileTab = 'dong-phu' | 'tu-luyen' | 'luyen-dan' | 'linh-dien' | 'phuong-thi';

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
  jadeTokens: number; // 1280 (Ngọc biếc)
  goldIngots: number; // 320 (Kim nguyên bảo)
  activeTechnique: string; // "Trường Xuân Công"
  isMeditating: boolean;
  lastOnlineTimestamp: number;
}

export interface MarketItem {
  id: string;
  name: string;
  description: string;
  originalPrice: number;
  discountPrice: number;
  category: 'PILL' | 'HERB' | 'WEAPON' | 'MANUAL';
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
