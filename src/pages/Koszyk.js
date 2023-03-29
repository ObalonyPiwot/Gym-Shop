import Navbar from '../components/Navbar';
import Sidebar from '../components/Sidebar';
import zdjUzyt from "../zdj/koszykItem.png";

const Koszyk = () => {

    return ( 
        <div>
         <Navbar/>
         <Sidebar/>
         <div className='content'> 
            <h2>Mój Koszyk</h2>
            <div className='koszyk'>
                <img  style={{
                height: 280,
                width: 2000,
                }} src={zdjUzyt}/>
            </div>
            <h1>Cena Łączna: 9.99 zł</h1>
            <div className='logging'>
                <button >Przejdź do płaności</button>
            </div>
         </div>
      </div>
     );
 }
 
 export default Koszyk;