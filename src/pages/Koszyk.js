import Navbar from '../components/Navbar';
import Sidebar from '../components/Sidebar';

const Koszyk = () => {

    return ( 
        <div>
         <Navbar/>
         <Sidebar/>
         <div className='content'> 
            Koszyk
         </div>
      </div>
     );
 }
 
 export default Koszyk;