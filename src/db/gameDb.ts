import Dexie, { type Table } from 'dexie';
import { CharacterState, InventoryItem, GardenPlot, AbodeFacility } from '../types/game';

export class TuTienDatabase extends Dexie {
  character!: Table<CharacterState, string>;
  inventory!: Table<InventoryItem, string>;
  garden!: Table<GardenPlot, number>;
  facilities!: Table<AbodeFacility, string>;

  constructor() {
    super('TuTienOnlineDB_v2');
    this.version(1).stores({
      character: 'id',
      inventory: 'id, defId, type',
      garden: 'id',
      facilities: 'id',
    });
  }
}

export const db = new TuTienDatabase();
