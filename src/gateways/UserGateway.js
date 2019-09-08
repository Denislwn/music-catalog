import {USERS_TABLE} from "../constans";
import { dataBase } from "../components/Root";
import {UserFinder} from "../finders/UserFinder";

export class UserGateway {
    constructor(login, password) {
        this.login = login;
        this.password = password;
    }

    registerUser() {
        const newUserId = dataBase.insert(USERS_TABLE, {
            login: this.login,
            password: this.password,
        });
        dataBase.commit();

        return UserFinder.getUser( { query: { ID: newUserId }})[0];
    }

    checkUserAuth() {
        const newUserId = dataBase.insert(USERS_TABLE, {
            login: this.login,
            password: this.password,
        });
        dataBase.commit();

        return UserFinder.getUser( { query: { ID: newUserId }})[0];
    }
}