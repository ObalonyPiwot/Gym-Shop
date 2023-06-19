import exit from "../assets/exit.png";
import React, { useState, useEffect } from 'react';
import { getCookie, checkCookieExists } from "../CookieFunction";
import favIcon from '../assets/favIcon.png'
function PreviewBlog({ item, childToParent }) {

    
    const [count, setCount] = useState(item.count);
    const [rating, setRating] = useState(0);

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
            alert("Brak autoryzacji");
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
                alert("Dodano do koszyka");
                setTimeout( () => {
                    window.location.reload();
                    
                }, 500 );
            })
            .catch(error => console.log('error', error));
    }
    function addToFav() {
        if(!checkCookieExists("SESSION-ID"))
            alert("Brak autoryzacji");
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
                    alert("Dodano do ulubionych");
                if(result==='remove')
                    alert("Usunięto z ulubionych");
            })
            .catch(error => console.log('error', error));
    }
    function addScore() {
        console.log(item);
        if(!checkCookieExists("SESSION-ID"))
        {
            alert("Brak autoryzacji");
            return;
        }
            
        if(rating<1)
        {
            alert("Wybierz ocenę");
            return;
        }
        let validateData = JSON.stringify(item);
        const sessionCookie = getCookie("SESSION-ID");
        fetch('http://localhost/addScore/'+rating, {
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
                    alert("Dodano ocenę");
                if(result==='change')
                    alert("Zmieniono ocenę");
            })
            .catch(error => console.log('error', error));
    }

    return (
        <div className="inspectBlog">
            <div className='content3'>
                <div className='zdjecieFull'>
                    <img className='zdjecieFull' src={item.photo} alt={item.title} />
                </div>
                <div className="previewContent">
                    <div className='tekst'>
                        <h2>{item.title}</h2>  
                        <a className="toCartFav" onClick={addToFav}>
                            <img src={favIcon} alt="Ulubione" />
                        </a>
                        <div className="zamkniecie" onClick={() => childToParent(null)}>
                            <img src={exit} alt="exit" />
                        </div>
                    </div>
                    <div className="tekst2">
                        <p className="idProd">ID produktu: {item.id}</p>
                        <br />
                        <p>Cena: {item.cena}</p>
                        <h2>Opis:</h2>
                        <p className="previewContentDesc">{item.body}</p>
                        <div className="guzior2 guzior2_PreviewBlog">
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

                        </div>
                        <div>Ocena: {item.ocena>0 ? item.ocena : 0}/5.0</div>
                        <div className="ratingButtons">
                        {[1, 2, 3, 4, 5].map((value) => (
                            <label key={value} className="ratingLabel">
                            <input
                                type="radio"
                                name="rating"
                                value={value}
                                checked={rating === value}
                                onChange={() => setRating(value)}
                            />
                            <h2>{value}</h2>
                            </label>
                        ))}
                        <button className="addRatingButton" onClick={addScore}>
                        Dodaj ocenę
                        </button>
                        </div>

                    </div>

                </div>
            </div>
        </div>
    )
}

export default PreviewBlog;

