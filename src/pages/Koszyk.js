import { useState } from 'react'
import Payment from "../components/Payment";
import Cart from "../components/KoszykZawartosc";
import '../cart.css';

const Koszyk = () => {
    const [currentForm, setCurrentForm] = useState('cart');
    const toggleForm = (formName) => {
        setCurrentForm(formName);
    }
   return ( 
    
    <div>
    {
        currentForm === "cart" ? <Cart onFormSwitch = {toggleForm}/> : <Payment onFormSwitch = {toggleForm}/>
    }
    </div>
    );
}
 
 export default Koszyk;