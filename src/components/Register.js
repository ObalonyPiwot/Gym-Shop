import { useState } from 'react'

const Register = (props) => {
    const[email, setEmail] = useState("");
    const[password, setPassword] = useState("");
    const[name, setName] = useState("");

    const handleSubmit = (e) =>{
        e.preventDefault();
        console.log(email);
    }
    return ( 
        <>
        <form onSubmit={handleSubmit}>
            <label htmlFor='name'>nazwa</label>
            <input value ={name} onChange = {(e) => setName(e.target.value)} placeholder="name" id='name' name='name'/>
            <br/>
            <label htmlFor='email'>email</label>
            <input value ={email} onChange = {(e) => setEmail(e.target.value)} type = "email" placeholder="email@gmail.com" id='email' name='email'/>
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