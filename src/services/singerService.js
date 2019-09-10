import { SingerFinder } from "../finders/SingerFinder";
import { SingerGateway } from "../gateways/SingerGateway";
import { SingGateway } from '../gateways/SingGateway'

export class SingerService {
  static getSingersList() {
    return SingerFinder.getSingersList();
  }

  static addNewSinger(newSingerData) {
    console.log('newSingerData.creatorId', newSingerData.creatorId);
    const singerGateway = new SingerGateway(
      newSingerData.name,
      newSingerData.country,
      newSingerData.group,
      newSingerData.creatorId,
    );

    return singerGateway.addNewSinger();
  }

  static editSinger = (newSingerData) => {
    const singerGateway = new SingerGateway(
      newSingerData.name,
      newSingerData.country,
      newSingerData.group,
      newSingerData.creatorId,
      newSingerData.ID,
    );

    return singerGateway.editSinger();
  };

  static deleteSinger = (singerId) => {
    new SingGateway(
        null,
        singerId,
        null,
        null,
        null,
    ).deleteAllSingsByAuthor();

    return new SingerGateway(
      null,
      null,
      null,
      null,
      singerId,
    ).deleteSinger();
  };
}
