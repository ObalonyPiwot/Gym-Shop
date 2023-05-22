import { getCookie, setCookie } from "../../CookieFunction";
import { useState } from "react";

export default function(){
    const [total, setTotal] = useState(0);
    const sessionCookie = getCookie("SESSION-ID");
    fetch('http://localhost/getDataFromSession', {
        method: 'GET',
        headers: {
            'SESSIONID': sessionCookie,
            'Content-Type': 'application/json'
        },
    })
        .then(response => response.text())
        .catch(error => console.log('error', error))
        .then(result => {
            const correctedString = result.replace(/([a-zA-Z0-9_\s]+)\s*=/g, '"$1": ')
                .replace(/(['"])?([a-zA-Z0-9_\s]+)(['"])?:/g, '"$2": ')
                .replace(/'/g, '"');
            const json = JSON.parse(correctedString);
            const transformed = Object.entries(json).map(([key, value]) => ({
                photo: value.photo,
                title: value.title,
                cena: value.cena,
                body: value.body,
                author: value.author,
                id: value.id,
                count: parseInt(value.count, 10)
              }));
              const totalLocal = transformed.reduce((acc, curr) => acc + curr.count, 0);
              setTotal(totalLocal);
        });

}


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
  