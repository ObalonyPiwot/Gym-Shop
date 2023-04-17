import exit from "../assets/exit.png";
import React, { useState, useEffect } from 'react';
import { useCookies } from 'react-cookie';
import axios from 'axios';

function PreviewBlog({ item, childToParent }) {
    const [sessionData, setSessionData] = useState({});
    const [cookies] = useCookies(['SESSION']);

    function test()
    {
        const fetchSessionData = async () => {
            try {
              const response = await fetch('http://localhost/session', {
                headers: { 'X-Auth-Token': cookies.SESSION }
              });
              const data = await response.json();
              console.log(data);
              setSessionData(data);
            } catch (error) {
              console.log(error);
            }
          };
      
          // Wywołaj funkcję pobierającą dane sesji
          fetchSessionData();
    }
    console.log(item);
    const photo = item.photo;
    let src = require(`${photo}`);
    return (
        <div className="inspectBlog">
            <div className='content3'>
                <div className='zdjecie'>
                    {/* <img src={logo}/> */}
                    <img src={src} alt={item.title} />
                </div>
                <div className="previewContent">
                    <div className='tekst'>
                        <h2>{item.title}</h2>
                        <div className="zamkniecie" onClick={() => childToParent(null)}>
                            <img src={exit} />
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
                        <div className="guzior2">
                            {/* <input type="number" className="quantity" min="1" max="99" defaultValue={"1"}/> */}
                            <button className="doKoszyka" onClick={test}>Do koszyka</button>
                        </div>
                        
                    </div>
                    
                </div>
            </div>
        </div>
    )
}

export default PreviewBlog;

