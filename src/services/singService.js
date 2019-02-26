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
        );

        return singGateway.addNewSing();
    }

    static editSing = (newSingData) => {
        const singGateway = new SingGateway(
            newSingData.name,
            newSingData.author,
            newSingData.description,
            newSingData.album,
        );

        return singGateway.editSing(newSingData.ID);
    };

    static deleteSing = (singId) => {
        return SingGateway.deleteSing(singId);
    }
}