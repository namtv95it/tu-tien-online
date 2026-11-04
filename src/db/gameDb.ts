import Dexie, { type Table } from 'dexie';
import { CharacterState, InventoryItem, GardenPlot, PlacedAbodeObject } from '../types/game';

export class TuTienDatabase extends Dexie {
  character!: Table<CharacterState, string>;
  inventory!: Table<InventoryItem, string>;
  garden!: Table<GardenPlot, number>;
  abodeObjects!: Table<PlacedAbodeObject, string>;

  constructor() {
    super('TuTienOnlineDB');
    this.version(1).stores({
      character: 'id',
      inventory: 'id, defId, type',
      garden: 'id',
      abodeObjects: 'id',
    });
  }
}

export const db = new TuTienDatabase();
