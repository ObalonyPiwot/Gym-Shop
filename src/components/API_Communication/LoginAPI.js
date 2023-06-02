/* eslint-disable react-hooks/rules-of-hooks */
import { getCookie, setCookie } from "../../CookieFunction"

export const getSession = () => {
    const sessionCookie = getCookie("SESSION-ID");
    if (sessionCookie) {
      console.log(sessionCookie);
      console.log("ISTNIEJE");
    } else {
      console.log("WYKONANO");
      // Jeśli nie ma ciasteczka z identyfikatorem sesji, wykonaj żądanie do serwera
      fetch("http://localhost/api/getSessionID")
        .then((response) => response.text())
        .then((data) => {
          setCookie("SESSION-ID", data, 1); // Zapisz identyfikator sesji w ciasteczku
        });
    }
  };
export const setUserSession = (userAccount) =>{
  const sessionCookie = getCookie("SESSION-ID");
  let validateData = JSON.stringify(userAccount);
    if (sessionCookie) {
        console.log("weszło");
        fetch('http://localhost/login/setUserToSession', {
            method: 'POST',
            headers: {
                'SESSIONID': sessionCookie,
                'Content-Type': 'application/json'
            },
            body: validateData
        })
            .then(response => response.text())
            .then(result => console.log(result))
            .catch(error => console.log('error', error));
    }
}
  