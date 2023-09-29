import { createAxiosClient } from "./createAxiosClient";
import { baseUrl } from "../Settings";
import {getToken, removeToken} from "../AuthStoreService"

const REFRESH_TOKEN_URL = ''
const BASE_URL = baseUrl;

function getCurrentAccessToken() {
    // this is how you access the zustand store outside of React.
    return getToken();
}

function getCurrentRefreshToken() {
    // this is how you access the zustand store outside of React.
    //return useAuthStore.getState().refreshToken
    return null;
}


function setRefreshedTokens(tokens){
}

async function logout(){
    removeToken();
}

export const client = createAxiosClient({
    options: {
        baseURL: BASE_URL,
        timeout: 300000,
        headers: {
            'Content-Type': 'application/json',
        }
    },
    getCurrentAccessToken,
    getCurrentRefreshToken,
    refreshTokenUrl: REFRESH_TOKEN_URL,
    logout,
    setRefreshedTokens
})