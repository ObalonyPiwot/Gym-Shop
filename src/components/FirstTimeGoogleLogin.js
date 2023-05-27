import { useState, useEffect } from 'react';


const FirstTimeGoogleLogin = (props) => {
    const[imie, setImie] = useState(props.user.given_name);
    const[nazwisko, setNazwisko] = useState(props.user.family_name);
    const[email, setEmail] = useState(props.user.email);
    const[telefon, setTelefon] = useState("");
    const[password, setPassword] = useState("");

    const handleSubmit = (e) =>{
        fetch("http://localhost/register/"+password+"/"+email+"/"+imie+"/"+nazwisko+"/"+telefon)
        .then((response) => response.json())
        .then((data) => {
            console.log(data);
            if (data.Status === 'success') {
                alert("Zarejestrowano. Zmiana na panel konta");
                fetch("http://localhost/login/"+email+"/"+password)
                .then((response) => response.json())
                .then((data) => {
                    if (data.Status === 'success') {
                        props.onLoggedSwitch('true');
                        props.setUser(data.User);
                    } else {
                        alert("Błąd logowania");
                    }
                })
            } else {
                alert("Błąd rejestracji");
            }
        })
        e.preventDefault();

    }
    return ( 
        <>
        <div className='content2'>
            <div className='logging'>
            <h2>Pierwsze logowanie z konta Google. Proszę dokończ tworzenie konta</h2>
                <form onSubmit={handleSubmit}>
                    <label htmlFor='imie'>Imie</label>
                    <input value ={imie} onChange = {(e) => setImie(e.target.value)} placeholder="imie" id='imie' name='imie' required/>
                    <br/>
                    <label htmlFor='nazwisko'>Nazwisko</label>
                    <input value ={nazwisko} onChange = {(e) => setNazwisko(e.target.value)} placeholder="nazwisko" id='nazwisko' name='nazwisko' required/>
                    <br/>
                    <label htmlFor='telefon'>Telefon</label>
                    <input onChange = {(e) => {const input = e.target.value;
                                            if (/^\d{0,9}$/.test(input)) setTelefon(input)
                                            }}
                     type="text" placeholder="telefon" id='telefon' name='telefon'  minLength="9"  maxLength="9" pattern="\d+" required
                    />
                    <br/>
                    <label htmlFor='email'>Adres e-mail</label>
                    <input value ={email} onChange = {(e) => setEmail(e.target.value)} type = "email" placeholder="przykladowy@mail.com" id='email' name='email' required/>
                    <br/>
                    <label htmlFor='password'>Hasło</label>
                    <input onChange = {(e) => setPassword(e.target.value)} type = "password" placeholder="******" id='password' name='password' required/>
                    <br/>
                    <button type ='submit'>Zarejestruj</button>
                </form>
            </div>
        </div>
        </>
     );
 }

 export default FirstTimeGoogleLogin;