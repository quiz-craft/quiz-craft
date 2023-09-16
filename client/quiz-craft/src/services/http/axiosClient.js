import { createAxiosClient } from "./createAxiosClient";
import { baseUrl } from "../Settings";
import {getToken} from "../AuthStoreService"

const BASE_URL = baseUrl;

function getCurrentAccessToken() {
    return getToken();
}

async function logout(){
    // TODO
    console.log('logout...')
}

export const client = createAxiosClient({
    options: {
        baseURL: BASE_URL,
        timeout: 3000,
        headers: {
            'Content-Type': 'application/json',
        }
    },
    getCurrentAccessToken,
    logout
})