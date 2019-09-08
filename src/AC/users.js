import {SAVE_USER_ID, EMPTY, IS_AUTH} from "../constans";
import { UserService } from "../services/userService";
import { history } from "../components/Root";

export const registerUser = (newUserData) => {
    const newUser = UserService.registerNewUser(newUserData);

    if (newUser) {
        history.push('/sings');

        localStorage.setItem(IS_AUTH, 'true');

        return {
            type: SAVE_USER_ID,
            data: newUser,
        }
    }
};

export const authUser = (userData) => {
    const user = UserService.checkUserAuth(userData);

    if (user) {
        history.push('/sings');

        localStorage.setItem(IS_AUTH, 'true');

        return {
            type: SAVE_USER_ID,
            data: user,
        }
    }

    return {
        type: EMPTY,
    }
};
