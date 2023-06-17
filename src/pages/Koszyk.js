import { useState } from 'react'
import Payment from "../components/Cart_Data/Payment_API/Payment";
import Cart from "../components/Cart_Data/KoszykZawartosc";
import '../components/Cart_Data/cart.css';

const Koszyk = () => {
    const [blogs, setBlogs] = useState({
        data: '',
        result: '',
        count: ''
    });
    const [currentForm, setCurrentForm] = useState('cart');
    const toggleForm = (formName) => {
        setCurrentForm(formName);
    }

    function setProducts(products, charge, count){
        setBlogs({
            ...blogs,
            data: products,
            result: charge,
            count: count,
        });
    }

    const setTotalResut = (data) => {
        setBlogs( e => ({
            ...e,
            result : ((100 - data)* 0.01 * blogs.result).toFixed(2)
        }));
    }

   return ( 
    
    <div>
    {
        currentForm === "cart" ? <Cart onFormSwitch = {toggleForm} initProducts = {setProducts} /> : <Payment onFormSwitch = {toggleForm} products = {blogs}  setTotal={setTotalResut}/>
    }
    </div>
    );
}
 
 export default Koszyk;