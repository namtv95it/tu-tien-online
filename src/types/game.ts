// Types for character, realm, stats, garden, abode, alchemy based on GDD Phàm Đạo 3D

export type RealmType = 'PHÀM NHÂN' | 'LUYỆN KHÍ';

export interface CharacterState {
  id: string;
  name: string;
  realm: RealmType;
  realmLevel: number; // 0 for Phàm Nhân, 1..3 for Luyện Khí 1..3
  cultivation: number; // Tiến trình tu vi hiện tại
  cultivationThreshold: number; // Ngưỡng đột phá tầng hiện tại
  qi: number; // Linh lực hiện tại
  maxQi: number; // Dung lượng linh lực
  meridianStability: number; // 0 - 100 Ổn định kinh mạch
  mindState: number; // 0 - 100 Tâm cảnh
  spiritSense: number; // Thần thức
  fatigue: number; // 0 - 100 Mệt mỏi
  affinity: 'WOOD' | 'WATER' | 'BALANCED'; // Linh căn
  alchemyMastery: number; // Kinh nghiệm đan đạo
  coins: number; // Linh thạch vụn
  lastOnlineTimestamp: number; // Cho lazy settlement ngoại tuyến
  isMeditating: boolean; // Đang tọa thiền
}

export type ItemType = 'HERB' | 'PILL' | 'MATERIAL' | 'FURNITURE' | 'SEED';
export type QualityType = 'HẠ PHẨM' | 'TRUNG PHẨM' | 'THƯỢNG PHẨM' | 'CỰC PHẨM';

export interface InventoryItem {
  id: string;
  defId: string;
  name: string;
  type: ItemType;
  quantity: number;
  description: string;
  quality?: QualityType;
  icon?: string;
}

export interface GardenPlot {
  id: number; // 0..11
  unlocked: boolean;
  x: number;
  z: number;
  seedId: string | null;
  seedName: string | null;
  plantedAt: number | null; // timestamp ms
  growthDuration: number; // seconds needed
  progress: number; // 0..100%
  moisture: number; // 0..100
  harvestReady: boolean;
}

export interface AbodeObjectDef {
  defId: string;
  name: string;
  category: 'FURNITURE' | 'FACILITY' | 'DECORATION';
  description: string;
  costCoins: number;
  width: number;
  depth: number;
  height: number;
}

export interface PlacedAbodeObject {
  id: string;
  defId: string;
  name: string;
  x: number;
  y: number;
  z: number;
  rotationY: number;
}

// Alchemy Recipe Definition
export interface AlchemyRecipe {
  id: string;
  name: string;
  targetPillDefId: string;
  description: string;
  requiredMastery: number;
  ingredients: { defId: string; name: string; quantity: number }[];
  optimalFireTemp: number; // 0 - 100 (vùng nhiệt tối ưu)
  fireTolerance: number; // độ rộng vùng an toàn (+/-)
}

export interface AlchemyBatchState {
  active: boolean;
  recipe: AlchemyRecipe | null;
  phase: 'PREPARATION' | 'HEATING' | 'CONDENSATION' | 'RESULT';
  currentTemp: number; // 0 - 100
  targetTemp: number;
  heatScore: number; // 0 - 100
  stability: number; // 0 - 100
  resultQuality: QualityType | 'HỎNG MẺ' | null;
  resultPillName: string | null;
}
