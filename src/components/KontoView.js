import { useState } from 'react';
import zdjUzyt from "../zdj/zdjUzytkownika.png";

const KontoView = (props) => {
    const [user, setUser] = useState(props.user);
    return ( 
        <>
        <div className='content2'>
            <div className='logging'>
                <div className='profilowe'>
                    <img  src={zdjUzyt}/>
                </div>
                <label htmlFor='imie'>Imie</label>
                <input value={user.imie} disabled id='imie' name='imie'/>
                <label htmlFor='nazwisko'>Nazwisko</label>
                <input value={user.nazwisko} disabled id='nazwisko' name='nazwisko'/>
                <h2>Dane Kontaktowe</h2>
                <label htmlFor='email'>Email</label>
                <input value={user.email} disabled id='email' name='email'/>
                <label htmlFor='telefon'>Nr Telefonu</label>
                <input value={user.telefon} disabled id='telefon' name='telefon'/>
                <button >Zmień Dane</button>
                <button >Historia Zakupów</button>
                <button >Ulubione</button>
                <button >Reklamacje</button>
                <button onClick={() => props.onLogOut('false')}>Wyloguj</button>
                
            </div>
        </div>
        </>
     );
 }
 
 export default KontoView;