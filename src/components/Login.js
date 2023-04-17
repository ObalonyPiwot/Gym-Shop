import { useState, useEffect } from 'react';
import logo from "../assets/googleIcon.png";
import { useGoogleLogin } from '@react-oauth/google';


const Login = (props) => {
    const[email, setEmail] = useState("");
    const[password, setPassword] = useState("");
    const [user, setUser] = useState(null);
//login zwykly
    const handleSubmit = (e) =>{
        fetch("http://localhost/login/"+email+"/"+password)
            .then((response) => response.json())
            .then((data) => console.log(data))
        e.preventDefault();
        console.log("http://localhost/login/"+email+"/"+password);
        props.onLoggedSwitch('true');
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
            .then((data) => console.log(data))
            .then(() => props.onLoggedSwitch('true'))
            .catch((error) => console.log(error));
        },
        onError: (error) => console.log('Login Failed:', error),
    });

    return ( 
        <>
        <div className='content2'>
            <div className='logging'>
            <h2>Logowanie</h2>
            <form onSubmit={handleSubmit}>
                <label htmlFor='email'>Adres e-mail</label>
                <input value ={email} onChange = {(e) => setEmail(e.target.value)} placeholder="email" id='email' name='email' required/>
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