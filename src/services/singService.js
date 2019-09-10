import { SingFinder } from "../finders/SingFinders";
import { SingGateway } from "../gateways/SingGateway";

export class SingService {
    static getSingList() {
        return SingFinder.getSingsList();
    }

    static addNewSing(newSingData) {
        const singGateway = new SingGateway(
            newSingData.name,
            newSingData.author,
            newSingData.description,
            newSingData.album,
            newSingData.creatorId,
        );

        return singGateway.addNewSing();
    }

    static editSing = (newSingData) => {
        const singGateway = new SingGateway(
            newSingData.name,
            newSingData.author,
            newSingData.description,
            newSingData.album,
            newSingData.creatorId,
            newSingData.ID,
        );

        return singGateway.editSing(newSingData.ID);
    };

    static deleteSing = (singId) => {
        return new SingGateway(
            null,
            null,
            null,
            null,
            null,
            singId,
        ).deleteSing();
    };
}