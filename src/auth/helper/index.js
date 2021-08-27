import { API } from "./../../backend";
import { emptyCart } from "../../core/helper/cartHelper"

export const signup = user => {
    return fetch(`${API}user/`, {
        method: "POST",
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
        },
        body: JSON.stringify(user)
    })
        .then((response) => response.json())
}

export const signin = user => {
    const formData = new FormData();
    for (const name in user) {
        formData.append(name, user[name])
    }

    return fetch(`${API}user/login/`, {
        method: "POST",
        body: formData
    })
        .then((response) => response.json())
        .catch((error) => console.log(error))
}

export const authenticate = ({ token, user }, next = () => { }) => {
    if (typeof window !== undefined) {
        localStorage.setItem("jwt", JSON.stringify(token));
        localStorage.setItem("user", JSON.stringify(user));
        next();
    }
}

export const isAuthenticated = async () => {
    if (typeof window !== undefined) {
        const token = JSON.parse(localStorage.getItem("jwt"));
        const user = JSON.parse(localStorage.getItem("user"));
        if (token) {
            return await fetch(`${API}user/authenticate/${user.id}/${token}`)
                .then((response) => response.json())
                .then((data) => {
                    if (data.success) {
                        return {token, user};
                    }
                    console.log(data);
                    return false;
                })
                .catch((error) => {
                    console.log(error)
                    return false;
                });
        }
        return false;
    }
    return false;
}

export const isLocallyAuthenticated = (next = () => {}) => {
    if (typeof window !== undefined) {
        const token = JSON.parse(localStorage.getItem("jwt"));
        const user = JSON.parse(localStorage.getItem("user"));
        if (token && user.id) {
            return user;
        }
        return false;
    }
    return false;
}

export const signout = (next = () => { }) => {
    const userAuth = isAuthenticated();
    userAuth.then((result) => {
        if (!result) {
            next();
            return true;
        }
        const userId = JSON.parse(localStorage.getItem("user")).id;
        if (typeof window !== undefined) {
            return fetch(`${API}user/logout/${userId}`)
                .then((response) => {
                    return response.json()
                })
                .then((result) => {
                    if (result.success) {
                        localStorage.removeItem("jwt");
                        localStorage.removeItem("user");
                        emptyCart(() => { console.log("User Cart Cleared") });
                        next()
                    }
                })
                .catch((error) => console.log(error))
        }
    })
}