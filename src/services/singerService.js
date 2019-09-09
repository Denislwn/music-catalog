import { SingerFinder } from "../finders/SingerFinder";
import { SingerGateway } from "../gateways/SingerGateway";
import { SingGateway } from '../gateways/SingGateway'

export class SingerService {
  static getSingersList() {
    return SingerFinder.getSingersList();
  }

  static addNewSinger(newSingerData) {
    const singerGateway = new SingerGateway(
      newSingerData.name,
      newSingerData.country,
      newSingerData.group,
    );

    return singerGateway.addNewSinger();
  }

  static editSinger = (newSingerData) => {
    const singerGateway = new SingerGateway(
      newSingerData.name,
      newSingerData.country,
      newSingerData.group,
      newSingerData.ID,
    );

    return singerGateway.editSinger();
  };

  static deleteSinger = (singerId) => {
    return new SingerGateway(
      null,
      null,
      null,
      singerId,
    ).deleteSinger();
  }
}
