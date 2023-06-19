import { useState, useEffect } from "react";
import Login from "../components/Login";
import Register from "../components/Register";
import FirstTimeGoogleLogin from "../components/FirstTimeGoogleLogin";
import Navbar from '../components/Navbar';
import KontoView from "../components/KontoView";
import { deleteCookie } from "../CookieFunction";
import { getSession, setUserSession } from "../components/API_Communication/LoginAPI";
import { getCookie, checkCookieExists } from "../CookieFunction";
import { logOut } from "../components/API_Communication/UserLogout";
import { useAlert } from "react-alert";

const Konto = () => {
    const [currentForm, setCurrentForm] = useState('login');
    const [logged, setLogged] = useState('false');
    const [firstTimeGoogleLogin, setFirstTimeGoogleLogin] = useState('false');
    const [user, setUser] = useState('');
    const [loading, setLoading] = useState(true); 
    //const alert = useAlert();

    const toggleForm = (formName) => {
        setCurrentForm(formName);
    }
    const toggleLogged = async (isLogged, userAcc) => {
        setLogged(isLogged);
        getSession();
        setTimeout(() => {
            setUserSession(userAcc);
        }, 500);

    }
    const onLogOut = (isLogged) => {
        setLogged(isLogged);
        logOut();
        deleteCookie("SESSION-ID");
        alert("Wylogowano");
        setTimeout(() => {
            window.location.reload();
        }, 1000);

    }

    useEffect(() => {
        const sessionCookie = getCookie("SESSION-ID");
        if (checkCookieExists("SESSION-ID")) {

            fetch('http://localhost/getDataFromSession', {
                method: 'GET',
                headers: {
                    'SESSIONID': sessionCookie,
                    'Content-Type': 'application/json'
                },
            })
                .then(response => response.text())
                .then(result => {
                    try {
                        const correctedString = result.replace(/([a-zA-Z0-9_\s]+)\s*=/g, '"$1": ')
                            .replace(/collections|user/g, match => match.trim())
                            .replace(/'/g, '"');
                        let json;
                        if (correctedString.includes('collections')) {
                            json = JSON.parse(correctedString.replace(/collections| user/g, match => match.trim()));
                        } else {
                            json = JSON.parse(correctedString);
                        }
                        setUser(json.user.id);

                    } catch (error) {
                        console.log('Error parsing JSON:', error);
                    } finally {
                        setLoading(false);
                    }
                })
                .catch(error => console.log('Fetch error:', error));
            setLogged(true);
        } else
            setLoading(false);

    }, []);


    if (loading) {
        return <div>Loading...</div>;
    }

    return (

        <div>
            <Navbar />
            {/* <Sidebar/> */}
            <div className='content'>
                {
                    logged === 'false' ?
                        currentForm === "login" ?
                            firstTimeGoogleLogin === "false" ?
                                <Login onFirstTimeGoogleLoginSwitch={setFirstTimeGoogleLogin} onFormSwitch={toggleForm} onLoggedSwitch={toggleLogged} setUser={setUser} /> :
                                <FirstTimeGoogleLogin onLoggedSwitch={toggleLogged} user={user} setUser={setUser} /> :
                            <Register onFormSwitch={toggleForm} /> :
                        <KontoView onLoggedSwitch={onLogOut} user={user} />
                }
            </div>
        </div>
    );
}

export default Konto;