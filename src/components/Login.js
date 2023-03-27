import { useState } from 'react'

const Login = (props) => {
    const[login, setLogin] = useState("");
    const[password, setPassword] = useState("");

    const handleSubmit = (e) =>{
        fetch("http://localhost/login/"+login+"/"+password)
            .then((response) => response.json())
            .then((data) => console.log(data))
        e.preventDefault();
        console.log("http://localhost/login/"+login+"/"+password);
    }
    return ( 
        <>
        <div className='content2'>
            <div className='logging'>
            <h2>Logowanie</h2>
            <form onSubmit={handleSubmit}>
                <label htmlFor='login'>Nazwa użytkownika</label>
                <input value ={login} onChange = {(e) => setLogin(e.target.value)} placeholder="login" id='login' name='login'/>
                <br/>
                <label htmlFor='password'>Hasło</label>
                <input value ={password} onChange = {(e) => setPassword(e.target.value)} type = "password" placeholder="******" id='password' name='password'/>
                <br/>
                <button type ='submit'>Zaloguj</button>
            </form>
            <button onClick={() => props.onFormSwitch('register')}>Nie posiadasz jeszcze konta? Zarejestruj sie tutaj!</button>
            </div>
        </div>
        </>
     );
 }
 
 export default Login;