import { getCookie } from "../../CookieFunction";


/* function to get data from our session */
export const getDataFromSession = () => {
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
            // const transformed = Object.entries(json).map(([, value]) => ({
            //     photo: value.photo,
            //     title: value.title,
            //     cena: value.cena,
            //     body: value.body,
            //     author: value.author,
            //     id: value.id,
            //     count: parseInt(value.count, 10)
            // }));

            // - future use
            //   const totalLocal = transformed.reduce((acc, curr) => acc + curr.count, 0);
        });

}

/* functions to delete items from cart
*   items will delete when payment will be succesful
*/
export const deleteDataFromSession = () => {

    const sessionCookie = getCookie("SESSION-ID");
    fetch('http://localhost/deleteProducts', {
        method: 'GET',
        headers: {
            'SESSIONID': sessionCookie,
            'Content-Type': 'application/json'
        }
    })
        .then(__response => __response.text)
        .catch(__error => console.log('Error', __error))
        .then(__result => {
            console.log("usunieto ");
        });
}

/* Function to delete selected item */
export const deleteSpecificDataFromSession = (props) => {
    fetch('http://localhost/deleteProduct', {
        method: 'POST',
        headers: {
            'SESSIONID': getCookie('SESSION-ID'),
            'Content-Type': 'application/json'
        },
        body: props
    })
        .then(__response => __response.text)
        .catch(__error => console.log('Error', __error))
        .then(__result => {
            setTimeout(() => {
                window.location.reload();
            }, 500)
        });
}

/*
* Function to call request that insert data in transaction table
*/
export const insertDataTransaction = (succes, amount, total) => {
    fetch('http://localhost/api/payment/insertDatabase', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            userData: getCookie("USER_DATA"),
            userCart: getCookie("USER_CART"),
            succes: succes,
            amount: amount,
            total: total
        })
    })
        .then(response => {
            console.log(response);
        })
        .catch(error => alert(error.message));
}

/*
* Function to call request that insert data in transaction table
*/
export const getDataTransaction = () => {
    fetch('http://localhost/api/payment/getTransactionHistory', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            userID: JSON.parse(getCookie("USER_DATA")).id
        },

    })
        .then(response => response.text())
        .catch(error => alert(error.message))
        .then(result => {
            console.log(result);
        })
}