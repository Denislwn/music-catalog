import { dataBase } from '../components/Root';
import { SINGS_TABLE } from '../constans';

export class SingFinder {
    static getSingsList() {
        return dataBase.queryAll(SINGS_TABLE);
    }

    static getSing(options) {
        return dataBase.queryAll(SINGS_TABLE, options);
    }
}