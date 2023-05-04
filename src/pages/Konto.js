import { useState } from "react";
import Login from "../components/Login";
import Register from "../components/Register";
import FirstTimeGoogleLogin from "../components/FirstTimeGoogleLogin";
import Navbar from '../components/Navbar';
import Sidebar from '../components/Sidebar';
import KontoView from "../components/KontoView";

const Konto = () => {
    const [currentForm, setCurrentForm] = useState('login');
    const [logged, setLogged] = useState('false');
    const [firstTimeGoogleLogin, setFirstTimeGoogleLogin] = useState('false');
    const [user, setUser] = useState(null);
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
            logged === 'false' ?
                currentForm === "login" ?
                    firstTimeGoogleLogin === "false"?
                        <Login onFirstTimeGoogleLoginSwitch = {setFirstTimeGoogleLogin} onFormSwitch = {toggleForm} onLoggedSwitch = {toggleLogged} setUser = {setUser}/> :
                            <FirstTimeGoogleLogin onLoggedSwitch = {toggleLogged}  user ={user} setUser = {setUser}/> :
                                <Register onFormSwitch = {toggleForm}/> :
                                    <KontoView onLoggedSwitch = {toggleLogged} user ={user}/>
        }
        </div>
    </div>
    );
}

export default Konto;