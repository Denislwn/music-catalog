import { SINGERS_TABLE, SINGS_TABLE } from '../constans'
import { dataBase } from "../components/Root";
import {SingerFinder} from "../finders/SingerFinder";
import { SingFinder } from '../finders/SingFinders'

export class SingerGateway {
  constructor(name, country, group, creatorId, id) {
    this.name = name;
    this.country = country;
    this.group = group || '-';
    this.creatorId = creatorId;
    this.id = id;
  }

  addNewSinger() {
    const newSingerId = dataBase.insert(SINGERS_TABLE, {
      name: this.name,
      country: this.country,
      group: this.group,
      creatorId: this.creatorId,
    });
    dataBase.commit();

    return SingerFinder.getSinger( { query: { ID: newSingerId }})[0];
  }

  editSinger() {
    const result = dataBase.update(SINGERS_TABLE, {ID: this.id}, (row) => {
      row.name = this.name;
      row.country = this.country;
      row.group = this.group;
      row.creatorId = this.creatorId;

      return row;
    });

    dataBase.commit();

    if (result) {
      return SingerFinder.getSinger( { query: { ID: this.id }})[0];
    }
  }

  deleteSinger() {
    const result = dataBase.deleteRows(SINGERS_TABLE, {ID: this.id});

    dataBase.commit();

    return result
  }
}
