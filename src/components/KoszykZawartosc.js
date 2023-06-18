import Navbar from './Navbar';
import Sidebar from './Sidebar';
import CartList from './CartList';
import { useState, useEffect } from 'react'
import { getCookie } from "../CookieFunction";
import Payment from "./Payment";
import Cart from "./KoszykZawartosc";
import '../cart.css';

const KoszykZawartosc = (props) => {

    const [blogs, setBlogs] = useState([]);


    useEffect(() => {

        const sessionCookie = getCookie("SESSION-ID");
        fetch('http://localhost/getDataFromSession', {
            method: 'GET',
            headers: {
                'SESSIONID': sessionCookie,
                'Content-Type': 'application/json'
            },
        })
            .then(response => response.text())
            .catch(error => console.log('error', error))
            .then(result => {
                const correctedString = result.replace(/([a-zA-Z0-9_\s]+)\s*=/g, '"$1": ')
                    .replace(/(['"])?([a-zA-Z0-9_\s]+)(['"])?:/g, '"$2": ')
                    .replace(/'/g, '"');
                const json = JSON.parse(correctedString);
                const transformed = Object.entries(json.collections).map(([key, value]) => ({
                    photo: value.photo,
                    title: value.title,
                    cena: value.cena,
                    body: value.body,
                    author: value.author,
                    id: value.id,
                    count: parseInt(value.count, 10)
                  }));
                  setBlogs(transformed);
            });

    }, []);

    let totalCena = blogs.reduce((total, blog) => {
        return (total + parseFloat(blog.cena.replace(' zł', '').replace(',', '.')))*blog.count;
    }, 0).toFixed(2);
    let spendCena = 9.99;
    let result = parseFloat(totalCena) + parseFloat(spendCena);

    const handleBlogs = (newBlogs) => {
        setBlogs(newBlogs);
      };
      const payment = () => {

      }
    

    return ( 
        <div>
         <Navbar/>
         <Sidebar/>
         <div className='cartContent'> 
            <div className='koszyk'>
                <div>
                    <div className='koszykTitle'>
                        <h2>KOSZYK</h2>
                    </div>
                    <div className='list'>
                        <CartList   blogs={blogs.filter((blog) => blog.author ==='KFD')} handleBlogs={handleBlogs} />
                    </div>
                </div>
            </div>
            <div className='paying'>
                <div className='payingMainDivPrice'>
                    <div className='payingDivPrice'>
                        <h2>{blogs.reduce((acc, curr) => acc + curr.count, 0)} szt.</h2>
                        <h2> {totalCena} zł</h2>
                    </div>
                    <div className='payingDivPrice'>
                        <h2>Wysyłka</h2>
                        <h2> {spendCena} zł</h2>
                    </div>
                </div>
                <div className='payingDivPrice'>
                    <h2> Razem</h2>
                    <h2> { result} zł</h2>
                </div>
                <button onClick={() => props.onFormSwitch('payment')}>Przejdź do płaności</button>
            </div>
         </div>
      </div>
     );
 }
 
 export default KoszykZawartosc;