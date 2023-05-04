import { useState, useEffect } from 'react';
import logo from "../assets/googleIcon.png";
import { useGoogleLogin } from '@react-oauth/google';


const Login = (props) => {
    const[email, setEmail] = useState("");
    const[password, setPassword] = useState("");
//login zwykly
    const handleSubmit = (e) =>{
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
        e.preventDefault();
    }
//login google
    const login = useGoogleLogin({
        onSuccess: (codeResponse) => {
            fetch(`https://www.googleapis.com/oauth2/v1/userinfo?access_token=${codeResponse.access_token}`, {
            headers: {
            Authorization: `Bearer ${codeResponse.access_token}`,
            Accept: 'application/json',
            },
            })
            .then((response) => response.json())
            .then((data) => fetch(`http://localhost/googleLogin/${data.email}`)
                .then((response) => response.json())
                .then((data2) => {
                    if (data2.Status === 'success') {
                        props.onLoggedSwitch('true');
                        props.setUser(data2.User);
                    }else if (data2.Status === 'firstTime') {
                        props.onFirstTimeGoogleLoginSwitch('true');
                        props.setUser(data);
                    } else {
                        alert("Błąd logowania");
                    }
                }))
            .catch((error) => { console.log(error); alert("Błąd logowania") });
        },
        onError: (error) => console.log('Login Failed:', error),
    });
    props.setUser(null);

    return ( 
        <>
        <div className='content2'>
            <div className='logging'>
            <h2>Logowanie</h2>
            <form onSubmit={handleSubmit}>
                <label htmlFor='email'>Adres e-mail</label>
                <input value ={email} onChange = {(e) => setEmail(e.target.value)}  type = "email" placeholder="email" id='email' name='email' required/>
                <br/>
                <label htmlFor='password'>Hasło</label>
                <input value ={password} onChange = {(e) => setPassword(e.target.value)} type = "password" placeholder="******" id='password' name='password' required/>
                <br/>
                <div className='guziki'>
                    <button className="guzikLogin" type ='submit'>Zaloguj</button>
                    <button className="guzikGoogle" onClick={() => login()} ><img  src={logo} alt="GYMBUDDY Logo"/></button>
                </div>
            </form>
            <button onClick={() => props.onFormSwitch('register')}>Nie posiadasz jeszcze konta? Zarejestruj sie tutaj!</button>
            <button onClick={() => props.onLoggedSwitch('true')}>Test</button>
            </div>
        </div>
        </>
     );
 }

 export default Login;