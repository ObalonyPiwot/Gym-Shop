import { getCookie } from "../../CookieFunction";

export const logOut = () => {
    fetch('http://localhost/login/deleteUserSession', {
        method: 'POST',
        headers: {
            'SESSIONID': getCookie("SESSION-ID"),
            'Content-Type': 'application/json'
        },
    })
}