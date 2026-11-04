// Types for character, realm, stats based on GDD Phàm Đạo 3D

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

export interface InventoryItem {
  id: string;
  defId: string;
  name: string;
  type: 'HERB' | 'PILL' | 'MATERIAL' | 'FURNITURE' | 'SEED';
  quantity: number;
  description: string;
  quality?: 'HẠ PHẨM' | 'TRUNG PHẨM' | 'THƯỢNG PHẨM' | 'CỰC PHẨM';
  icon?: string;
}

export interface GardenPlot {
  id: number; // 0..11
  unlocked: boolean;
  seedId: string | null;
  seedName: string | null;
  plantedAt: number | null; // timestamp
  growthDuration: number; // seconds needed
  moisture: number; // 0..100
  harvestReady: boolean;
}

export interface AbodeObject {
  id: string;
  defId: string;
  name: string;
  x: number;
  y: number;
  z: number;
  rotationY: number;
}

