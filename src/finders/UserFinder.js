import { dataBase } from '../components/Root';
import { USERS_TABLE } from '../constans';

export class UserFinder {
    static getUsersList() {
        return dataBase.queryAll(USERS_TABLE);
    }

    static getUser(options) {
        return dataBase.queryAll(USERS_TABLE, options);
    }
}