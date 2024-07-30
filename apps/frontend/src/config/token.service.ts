const ACCESS_TOKEN_KEY = "access_token";
const REFRESH_TOKEN_KEY = "refresh_token";

export const getAccessToken = () => {
    return window.localStorage.getItem(ACCESS_TOKEN_KEY);
};

export const saveAccessToken = (token: string) => {
    window.localStorage.setItem(ACCESS_TOKEN_KEY, token);
};

export const destroyAccessToken = () => {
    window.localStorage.removeItem(ACCESS_TOKEN_KEY);
};

export const getRefreshToken = () => {
    return window.localStorage.getItem(REFRESH_TOKEN_KEY);
};

export const saveRefreshToken = (token: string) => {
    window.localStorage.setItem(REFRESH_TOKEN_KEY, token);
};

export const destroyRefreshToken = () => {
    window.localStorage.removeItem(REFRESH_TOKEN_KEY);
};

export default {
    getAccessToken,
    saveAccessToken,
    destroyAccessToken,
    getRefreshToken,
    saveRefreshToken,
    destroyRefreshToken,
};
