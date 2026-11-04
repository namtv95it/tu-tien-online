import Dexie, { type Table } from 'dexie';
import { CharacterState } from '../types/game';

export class TuTienDatabase extends Dexie {
  character!: Table<CharacterState, string>;

  constructor() {
    super('TuTienOnlineDB_v3');
    this.version(1).stores({
      character: 'id',
    });
  }
}

export const db = new TuTienDatabase();
