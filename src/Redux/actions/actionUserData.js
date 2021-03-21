import {
    USER_DATA_JWT,
    USER_LOGOUT,
} from "./types";



export const setUserData = (_jwt_token, _user) => {
    return {
        type: USER_DATA_JWT,
        jwt: _jwt_token,
        user: _user
    }
}

export const userLogout = () => {
    return {
        type: USER_LOGOUT
    }
}