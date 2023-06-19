import { useState } from 'react';
import zdjUzyt from "../zdj/zdjUzytkownika.png";
import ChangeData from "../components/Account/ChangeData";
import History from "../components/Account/History";
import Favourite from "../components/Account/Favourite";
import Complaints from "../components/Account/Complaints";
import AdminView from "../components/Account/AdminView";
import Firms from "../components/Account/Firms";
import { useEffect } from 'react';
import { setCookie } from "../CookieFunction";

const KontoView = (props) => {
    const [user, setUser] = useState(props.user);
    const [action, setAction] = useState(0);

    useEffect(() =>{
        setCookie("USER_DATA", JSON.stringify(props.user), 1);
    })
    return ( 
        <>
        {action===0 && (
            <div className='content2'>
                <div className='logging'>
                    <div className='profilowe'>
                        <img src={zdjUzyt} alt="Profile" />
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
                    <button onClick={() => setAction(1)}>Zmień Dane</button>
                    <button onClick={() => setAction(2)}>Historia Zakupów</button>
                    <button onClick={() => setAction(3)}>Ulubione</button>
                    <button onClick={() => setAction(4)}>Reklamacje</button>
                    <button onClick={() => setAction(5)}>Panel dla Firm</button>
                    {user.typKonta==='Admin' && (<button onClick={() => setAction(6)}>Panel Admina</button>)}
                    <button onClick={() => {props.onLoggedSwitch(false);}}>Wyloguj</button>
                </div>
            </div>
        )}
        {action===1 && (<ChangeData user={user} changeState = {setAction} />)}
        {action===2 && (<History user={user} changeState = {setAction} />)}
        {action===3 && (<Favourite user={user} changeState = {setAction} />)}
        {action===4 && (<Complaints user={user} changeState = {setAction} />)}
        {action===5 && (<Firms user={user} changeState = {setAction} />)}
        {action===6 && (<AdminView user={user} changeState = {setAction} />)}
        </>
     );
 }
 
 export default KontoView;