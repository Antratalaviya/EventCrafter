export const setItem = (string, value) => {
    return localStorage.setItem(string, value);
}

export const getItem = (string) => {
    return localStorage.getItem(string);
}

export const removeItem = (string) => {
    return localStorage.removeItem(string);
}

