import { useState, useEffect } from 'react';


const ChangeData = (props) => {
    const[imie, setImie] = useState(props.user.imie);
    const[nazwisko, setNazwisko] = useState(props.user.nazwisko);
    const[email, setEmail] = useState(props.user.email);
    const[telefon, setTelefon] = useState(props.user.telefon);
    const[password, setPassword] = useState(props.user.password);
    const handleSubmit = (e) =>{
        fetch("http://localhost/updateAccount/"+email+"/"+imie+"/"+nazwisko+"/"+telefon)
        .then((response) => response.json())
        .then((data) => {
            console.log(data);
            if (data.Status === 'success') {
                alert("Zaktualizowano. Zmiana na panel konta");
                props.user.imie=imie;
                props.user.nazwisko=nazwisko;
                props.user.telefon=telefon;
                props.changeState(0);
            } else {
                alert("Błąd aktualizacji");
            }
        })
        e.preventDefault();

    }
    return ( 
        <>
        <div className='content2'>
            <div className='logging'>
            <h2>Wprowadź nowe dane kontaktowe</h2>
                <form onSubmit={handleSubmit}>
                    <label htmlFor='imie'>Imie</label>
                    <input value ={imie} onChange = {(e) => setImie(e.target.value)} placeholder="imie" id='imie' name='imie' required/>
                    <br/>
                    <label htmlFor='nazwisko'>Nazwisko</label>
                    <input value ={nazwisko} onChange = {(e) => setNazwisko(e.target.value)} placeholder="nazwisko" id='nazwisko' name='nazwisko' required/>
                    <br/>
                    <label htmlFor='telefon'>Telefon</label>
                    <input  value ={telefon} onChange = {(e) => {const input = e.target.value;
                                            if (/^\d{0,9}$/.test(input)) setTelefon(input)
                                            }}
                     type="text" placeholder="telefon" id='telefon' name='telefon'  minLength="9"  maxLength="9" pattern="\d+" required
                    />
                    <br/>
                    <button type ='submit'>Zmien dane</button>
                    <button onClick={() => props.changeState(0)}>Anuluj</button>
                </form>
            </div>
        </div>
        </>
     );
 }

 export default ChangeData;