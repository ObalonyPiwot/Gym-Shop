import { getCookie } from "../../CookieFunction";
import { useAlert } from "react-alert";

/* function to get data from our session */
export const getDataFromSession = () =>{
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
            const transformed = Object.entries(json).map(([, value]) => ({
                photo: value.photo,
                title: value.title,
                cena: value.cena,
                body: value.body,
                author: value.author,
                id: value.id,
                count: parseInt(value.count, 10)
              }));

              // - future use
            //   const totalLocal = transformed.reduce((acc, curr) => acc + curr.count, 0);
        });

}

/* functions to delete items from cart
*   items will delete when payment will be succesful
*/
export const deleteDataFromSession = () =>{
    const sessionCookie = getCookie("SESSION-ID");
    fetch( 'http://localhost/deleteProducts',{
        method: 'GET',
        headers: {
            'SESSIONID' : sessionCookie,
            'Content-Type' : 'application/json'
        }
    })
    .then( __response => __response.text)
    .catch( __error => console.log('Error', __error))
    .then( __result => {
        console.log("usunieto ");
    });
}

/* Function to delete selected item */
export const deleteSpecificDataFromSession = (props) => {
    fetch( 'http://localhost/deleteProduct', {
        method: 'POST',
        headers: {
            'SESSIONID' : getCookie('SESSION-ID'),
            'Content-Type' : 'application/json'
        },
        body: props
    })
    .then( __response => __response.text)
    .catch( __error => console.log('Error', __error))
    .then( __result => {
        //useAlert().success("Pomyślnie usunięto produkt");
        setTimeout( () =>{
            window.location.reload();
        }, 500)
    });
}