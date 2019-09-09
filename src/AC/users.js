import { SAVE_USER_ID, EMPTY, IS_AUTH_USER_ID, GET_ALL_SINGS, GET_ALL_USERS } from '../constans'
import { UserService } from "../services/userService";
import { history } from "../components/Root";

export const registerUser = (newUserData) => {
    const newUser = UserService.registerNewUser(newUserData);

    if (newUser) {
        history.push('/sings');

        localStorage.setItem(IS_AUTH_USER_ID, newUser.ID);

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

        localStorage.setItem(IS_AUTH_USER_ID, user.ID);

        return {
            type: SAVE_USER_ID,
            data: user,
        }
    }

    return {
        type: EMPTY,
    }
};

export const getAllUsers = () => {
    return {
        type: GET_ALL_USERS,
        data: UserService.getUsersList(),
    }
};
