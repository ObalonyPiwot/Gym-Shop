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
        <form onSubmit={handleSubmit}>
            <label htmlFor='name'>nazwa</label>
            <input value ={name} onChange = {(e) => setName(e.target.value)} placeholder="name" id='name' name='name'/>
            <br/>
            <label htmlFor='login'>login</label>
            <input value ={login} onChange = {(e) => setLogin(e.target.value)} type = "login" placeholder="login@gmail.com" id='login' name='login'/>
            <br/>
            <label htmlFor='password'>password</label>
            <input value ={password} onChange = {(e) => setPassword(e.target.value)} type = "password" placeholder="******" id='password' name='password'/>
            <br/>
            <button type ='submit'>Zaloguj</button>
        </form>
        <button onClick={() => props.onFormSwitch('login')}>Posiadasz już konto? Zaloguj sie tutaj!</button>
        </>
     );
 }
 
 export default Register;