import { useState } from "react";
import Login from "../components/Login";
import Register from "../components/Register";
import Navbar from '../components/Navbar';
import Sidebar from '../components/Sidebar';
import KontoView from "../components/KontoView";

const Konto = () => {
    const [currentForm, setCurrentForm] = useState('login');
    const [logged, setLogged] = useState('false');
    const toggleForm = (formName) => {
        setCurrentForm(formName);
    }
    const toggleLogged = (isLogged) => {
        setLogged(isLogged);
    }
   return ( 
    
    <div>
        <Navbar/>
        {/* <Sidebar/> */}
        <div className='content'> 
        {
            logged === 'false' ? currentForm === "login" ? <Login onFormSwitch = {toggleForm} onLoggedSwitch = {toggleLogged}/> : <Register onFormSwitch = {toggleForm}/> : <KontoView onLoggedSwitch = {toggleLogged}/>
        }
        </div>
    </div>
    );
}

export default Konto;