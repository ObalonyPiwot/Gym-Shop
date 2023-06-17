import logo from "../assets/logo2.png";
import { useEffect } from "react";
import { getCookie, checkCookieExists } from "../CookieFunction";
import { useState } from "react";

const Navbar = () => {

    const [total, setTotal] = useState(0);
    useEffect(() => {
        if (checkCookieExists("SESSION-ID")) {
            const sessionCookie = getCookie("SESSION-ID");
            fetch('http://localhost/getDataFromSession', {
                method: 'GET',
                headers: {
                    'SESSIONID': sessionCookie,
                    'Content-Type': 'application/json'
                },
            })
                .then(response => response.text())
                .then(result => {
                    try {
                        const correctedString = result.replace(/([a-zA-Z0-9_\s]+)\s*=/g, '"$1": ')
                            .replace(/(['"])?([a-zA-Z0-9_\s]+)(['"])?:/g, '"$2": ')
                            .replace(/'/g, '"');
                        const json = JSON.parse(correctedString);
                        const transformed = Object.entries(json.collections).map(([key, value]) => ({
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
                    } catch (error) {
                        console.log('Error parsing JSON:', error);
                    }
                })
                .catch(error => console.log('Fetch error:', error));
        }



    }, []);

    return (
        <nav className="navbar">
            {/* <h1>GYMBUDDY</h1> */}
            <a className="logo" href="/">
                <img src={logo} alt="GYMBUDDY Logo" />
            </a>
            <input
                type="wyszukiwanie"
                placeholder="Wyszukaj przedmiotu..."
            />
            <div className="links">
                <a href="/">Home</a>
                <a href="/Ulubione">Ulubione</a>
                <a href="/Koszyk">Koszyk</a>
                <a href="/Promocje">Promocje</a>
                <a href="/Nowosci">Nowości</a>
                <a href="/Konto">Konto</a>
            </div>
            <div className="cartItems">
                <p> {total}</p>
            </div>
        </nav>
    );
}

export default Navbar;