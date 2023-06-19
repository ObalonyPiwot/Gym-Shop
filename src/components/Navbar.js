import logo from "../assets/logo2.png";
import { useEffect } from "react";
import { getCookie, checkCookieExists } from "../CookieFunction";
import { useState } from "react";
import Autocomplete from 'react-autocomplete';
import PreviewBlog from '../components/PreviewBlog';
const Navbar = () => {


    function _fixJsonString(jsonString) {
        jsonString = jsonString.trim().slice(1, -1);
      
        jsonString = jsonString.replace(/=/g, ':');
      
        jsonString = jsonString.replace(/'/g, '"');
      
        jsonString = jsonString.replace(/,(\s*})/g, '$1');
      
        jsonString = '{' + jsonString + '}';
      
        return jsonString;
      }

    const [total, setTotal] = useState(0);

    return (
        <nav className="navbar">
            {/* <h1>GYMBUDDY</h1> */}
            <a className="logo" href="/">
                <img src={logo} alt="GYMBUDDY Logo" />
            </a>
            <div className="links">
                <a href="/">Home</a>
                <a href="/Ulubione">Ulubione</a>
                <a href="/Koszyk">Koszyk</a>
                <a href="/Promocje">Promocje</a>
                <a href="/Nowosci">Nowości</a>
                <a href="/Konto">Konto</a>
            </div>
            <div className="cartItems">
                <p> {total}</p>
            </div>
        </nav>
    );
}

export default Navbar;