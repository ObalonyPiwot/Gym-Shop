import { useState } from 'react';
import zdjUzyt from "../zdj/zdjUzytkownika.png";

const KontoView = (props) => {
    const[imie, setImie] = useState("Adam");
    const[nazwisko, setNazwisko] = useState("Kowalski");
    const[nazwaUzytkownika, setNazwaUzytkownikao] = useState("KociakNiszczyciel_21:37");
    const[email, setEmail] = useState("adres@gmail.com");
    const[telefon, setTelefon] = useState("123456789");

    return ( 
        <>
        <div className='content2'>
            <div className='logging'>
                <div className='profilowe'>
                    <img  src={zdjUzyt}/>
                <h2>{nazwaUzytkownika}</h2>
                </div>
                <label htmlFor='imie'>Imie</label>
                <input value={imie} disabled id='imie' name='imie'/>
                <label htmlFor='nazwisko'>Nazwisko</label>
                <input value={nazwisko} disabled id='nazwisko' name='nazwisko'/>
                <h2>Dane Kontaktowe</h2>
                <label htmlFor='email'>Email</label>
                <input value={email} disabled id='email' name='email'/>
                <label htmlFor='telefon'>Nr Telefonu</label>
                <input value={telefon} disabled id='telefon' name='telefon'/>
                <button >Zmień Dane</button>
                <button >Historia Zakupów</button>
                <button >Ulubione</button>
                <button >Reklamacje</button>
                <button onClick={() => props.onLoggedSwitch('false')}>Wyloguj</button>
                
            </div>
        </div>
        </>
     );
 }
 
 export default KontoView;