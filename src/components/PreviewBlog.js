import exit from "../assets/exit.png";
import React, { useState } from 'react';
import { getCookie, checkCookieExists } from "../CookieFunction";
import { useAlert } from "react-alert";

function PreviewBlog({ item, childToParent }) {

    const [count, setCount] = useState(item.count);
    const alert = useAlert();

    const handleQuantityChange = (event) => {
        setCount(event.target.value);

        const newItem = item;
        newItem.count = event.target.value;
        childToParent(newItem);
    };

    const currentPrice = parseFloat(item.cena).toFixed(2) * count;

    function addToCart() {
        if(!checkCookieExists("SESSION-ID"))
        {
            alert.error("Brak autoryzacji");
            return;
        }
        let validateData = JSON.stringify(item);
        const sessionCookie = getCookie("SESSION-ID");
        fetch('http://localhost/Cart/setRedisData', {
            method: 'POST',
            headers: {
                'SESSIONID': sessionCookie,
                'Content-Type': 'application/json'
            },
            body: validateData
        })
            .then(response => response.text())
            .then(result => {
                alert.success("Dodano do koszyka");
                setTimeout( () => {
                    window.location.reload();
                    
                }, 500 );
            })
            .catch(error => console.log('error', error));
    }
    function addToFav() {
        if(!checkCookieExists("SESSION-ID"))
            alert.error("Brak autoryzacji");
        let validateData = JSON.stringify(item);
        const sessionCookie = getCookie("SESSION-ID");
        fetch('http://localhost/addFavourite', {
            method: 'POST',
            headers: {
                'SESSIONID': sessionCookie,
                'Content-Type': 'application/json'
            },
            body: validateData
        })
            .then(response => response.text())
            .then(result => {
                if(result==='add')
                    alert.success("Dodano do ulubionych");
                if(result==='remove')
                    alert.error("Usunięto z ulubionych");
                const timer = setTimeout(() => {
                    alert.removeAll();
                }, 1000);
            
                return () => {
                    clearTimeout(timer);
                };
            })
            .catch(error => console.log('error', error));
    }

    return (
        <div className="inspectBlog">
            <div className='content3'>
                <div className='zdjecie'>
                    {/* <img src={logo}/> */}
                    <img src={item.photo} alt={item.title} />
                </div>
                <div className="previewContent">
                    <div className='tekst'>
                        <h2>{item.title}</h2>  <button className="toCart" onClick={addToFav}>Ulubione</button>
                        <div className="zamkniecie" onClick={() => childToParent(null)}>
                            <img src={exit} alt="exit" />
                        </div>
                    </div>
                    <div className="tekst2">
                        <p className="idProd">ID produktu: {item.id}</p>
                        <br />
                        <p className="previewContentAuthor">Producent: {item.author}</p>

                        {/* <p>Kategoria: {item.cathegory}</p> !!!!!DOPISAC PO ZROBIENIU KATEGORI!!!*/}
                        <p>Cena: {item.cena}</p>
                        <h2>Opis:</h2>
                        <p className="previewContentDesc">{item.body}</p>
                        <div className="guzior2 guzior2_PreviewBlog">
                            {/* <input type="number" className="quantity" min="1" max="99" defaultValue={"1"}/> */}
                            <div className="guzior2Counter">
                                <input
                                    type="number"
                                    className="quantity"
                                    min="1" max="99"
                                    placeholder={item.count}
                                    onChange={(event) => { handleQuantityChange(event); }}
                                />
                                <p className="cena"> {currentPrice} zł</p>

                            </div>
                            <button className="toCart" onClick={addToCart}>Do koszyka</button>
                            {/* <button className="Otworz dane z serwera" onClick={get}>Pobierz rzeczy </button> */}

                        </div>
                        Ocena: {item.ocena}/5.0

                    </div>

                </div>
            </div>
        </div>
    )
}

export default PreviewBlog;