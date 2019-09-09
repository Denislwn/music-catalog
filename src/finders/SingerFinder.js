import { dataBase } from '../components/Root';
import { SINGERS_TABLE } from '../constans';

export class SingerFinder {
  static getSingersList() {
    return dataBase.queryAll(SINGERS_TABLE);
  }

  static getSinger(options) {
    return dataBase.queryAll(SINGERS_TABLE, options);
  }
}
