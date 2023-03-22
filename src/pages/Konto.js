import { useState } from "react";
import Login from "../components/Login";
import Register from "../components/Register";
import Navbar from '../components/Navbar';
import Sidebar from '../components/Sidebar';

const Konto = () => {
    const [currentForm, setCurrentForm] = useState('login');
    const toggleForm = (formName) => {
        setCurrentForm(formName);
    }
   return ( 
    
    <div>
        <Navbar/>
        <Sidebar/>
        <div className='content'> 
        {
            currentForm === "login" ? <Login onFormSwitch = {toggleForm}/> : <Register onFormSwitch = {toggleForm}/>
        }
        </div>
    </div>
    );
}

export default Konto;