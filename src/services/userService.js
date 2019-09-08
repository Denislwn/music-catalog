import { UserFinder } from "../finders/UserFinder";
import { UserGateway } from "../gateways/UserGateway";

export class UserService {
    static getUsersList() {
        return UserFinder.getUsersList();
    }

    static registerNewUser(newUser) {
        const userGateway = new UserGateway(
            newUser.login,
            newUser.password,
        );

        return userGateway.registerUser();
    }

    static checkUserAuth = (userData) => {
        return UserFinder.getUser( {query: {
            login: userData.login,
            password: userData.password,
        }})[0];
    };
}