import { Route } from "react-router-dom";
import logo from "../assets/logo2.png";

const Navbar = () => {
    return ( 
        <nav className="navbar">
            {/* <h1>GYMBUDDY</h1> */}
            <a className="logo" href="/">
             <img  src={logo} alt="GYMBUDDY Logo" />
            </a>
            <input 
            type="wyszukiwanie"
            placeholder="Wyszukaj przedmiotu..."
            />
            <div className="links">
                <a href="/">Home</a>
                <a href="/Koszyk">Koszyk</a>
                <a href="/Promocje">Promocje</a>
                <a href="/Nowosci">Nowości</a>
                <a href="/Konto">Konto</a>
            </div>
        </nav>
     );
}
 
export default Navbar;