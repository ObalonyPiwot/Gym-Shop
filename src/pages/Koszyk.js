import Navbar from '../components/Navbar';
import Sidebar from '../components/Sidebar';
import CartList from '../components/CartList';
import { useState } from 'react'
import '../cart.css';

const Koszyk = () => {

    const[blogs, setBlogs] = useState([
        {photo: "./6.png", title: 'Erytrytol 1000G', cena:"9.99 zł", body: 'X', author: 'KFD', id: 6},
        {photo: "./7.png", title: 'Delicates kisiel na zimno 259G', cena:"19.99 zł", body: 'X', author: 'KFD', id: 7},
       ]);

    const totalCena = blogs.reduce((total, blog) => {
        return total + parseFloat(blog.cena.replace(' zł', '').replace(',', '.'));
    }, 0).toFixed(2);
    let spendCena = 9.99;
    const result = parseFloat(totalCena) + parseFloat(spendCena);

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
                        <CartList   blogs={blogs.filter((blog) => blog.author ==='KFD')} />
                    </div>
                </div>
            </div>
            <div className='paying'>
                <div className='payingMainDivPrice'>
                    <div className='payingDivPrice'>
                        <h2>{blogs.length} szt.</h2>
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
                <button >Przejdź do płaności</button>
            </div>
         </div>
      </div>
     );
 }
 
 export default Koszyk;