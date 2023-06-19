import { useState } from 'react'

const Register = (props) => {
    const[imie, setImie] = useState("");
    const[nazwisko, setNazwisko] = useState("");
    const[email, setEmail] = useState("");
    const[telefon, setTelefon] = useState("");
    const[password, setPassword] = useState("");

    const handleSubmit = (e) =>{
        fetch("http://localhost/register/"+password+"/"+email+"/"+imie+"/"+nazwisko+"/"+telefon)
        .then((response) => response.json())
        .then((data) => {
            console.log(data);
            if (data.Status === 'success') {
                alert("Zarejestrowano. Zmiana na panel logowania");
                props.onFormSwitch('login');
            } else if (data.Status === 'exists') {
                alert("Konto o podanym e-mailu juz istnieje");
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
            <h2>Rejestracja</h2>
                <form onSubmit={handleSubmit}>
                    <label htmlFor='imie'>Imie</label>
                    <input value ={imie} onChange = {(e) => setImie(e.target.value)} placeholder="imie" id='imie' name='imie' required/>
                    <br/>
                    <label htmlFor='nazwisko'>Nazwisko</label>
                    <input value ={nazwisko} onChange = {(e) => setNazwisko(e.target.value)} placeholder="nazwisko" id='nazwisko' name='nazwisko' required/>
                    <br/>
                    <label htmlFor='telefon'>Telefon</label>
                    <input value ={telefon} onChange = {(e) => {const input = e.target.value;
                                            if (/^\d{0,9}$/.test(input)) setTelefon(input)
                                            }}
                     type="text" placeholder="telefon" id='telefon' name='telefon'  minLength="9"  maxLength="9" pattern="\d+" required
                    />
                    <br/>
                    <label htmlFor='email'>Adres e-mail</label>
                    <input value ={email} onChange = {(e) => setEmail(e.target.value)} type = "email" placeholder="przykladowy@mail.com" id='email' name='email' required/>
                    <br/>
                    <label htmlFor='password'>Hasło</label>
                    <input value ={password} onChange = {(e) => setPassword(e.target.value)} type = "password" placeholder="******" id='password' name='password' required/>
                    <br/>
                    <button type ='submit'>Zarejestruj</button>
                </form>
                <button onClick={() => props.onFormSwitch('login')}>Posiadasz już konto? Zaloguj sie tutaj!</button>
        </div>
        </div>
        </>
     );
 }
 
 export default Register;