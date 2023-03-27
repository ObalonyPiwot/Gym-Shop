import { useState } from 'react'

const Register = (props) => {
    const[login, setLogin] = useState("");
    const[password, setPassword] = useState("");
    const[name, setName] = useState("");

    const handleSubmit = (e) =>{
        e.preventDefault();
        console.log(login);
    }
    return ( 
        <>
         <div className='content2'>
            <div className='logging'>
            <h2>Rejestracja</h2>
                <form onSubmit={handleSubmit}>
                    <label htmlFor='name'>Nazwa użytkownika</label>
                    <input value ={name} onChange = {(e) => setName(e.target.value)} placeholder="login" id='name' name='name'/>
                    <br/>
                    <label htmlFor='login'>Adres e-mail</label>
                    <input value ={login} onChange = {(e) => setLogin(e.target.value)} type = "login" placeholder="przykladowy@mail.com" id='login' name='login'/>
                    <br/>
                    <label htmlFor='password'>Hasło</label>
                    <input value ={password} onChange = {(e) => setPassword(e.target.value)} type = "password" placeholder="******" id='password' name='password'/>
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