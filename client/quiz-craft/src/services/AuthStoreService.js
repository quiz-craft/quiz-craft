import { getLocalStorageItem, setLocalStorageItem, removeLocalStorageItem } from "./LocalStorageService";

export const setToken = (value) => {
    try {
        setLocalStorageItem("token", value);
    } catch(error) {
        console.error(`Error in saving user token. Reason: ${error}`);
    }
}

export const getToken = () => {
    try {
        let obj = getLocalStorageItem("token");
        return obj.access_token
    } catch (error) {
        console.error(`Error in getting user token. Reason: ${error}`);
    }
}

export const isAuthenticated = () => {
    try {
        let token = getLocalStorageItem("token");
        if(token) return true;
        return false;
    } catch (error) {
        console.error(`Error in getting user token. Reason: ${error}`);
        return false;
    }
}

export const removeToken = () => {
    try {
        removeLocalStorageItem("token");
    } catch (error) {
        console.error(`Error in getting user token. Reason: ${error}`);
    }
}