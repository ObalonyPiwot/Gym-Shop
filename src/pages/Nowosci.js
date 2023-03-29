import { useState } from 'react'
import BlogList from '../components/BlogList';
import ItemPromocyjny from '../components/ItemPromocyjny';
import Navbar from '../components/Navbar';
import Sidebar from '../components/Sidebar';

const Nowosci = () => {

    const[blogs, setBlogs] = useState([
        {photo: "./3.png", title: 'Uchwyt do wyciągu', cena:"78.99 zł", body: 'X', author: 'JUST7GYM', id: 3},
        {photo: "./4.png", title: 'Stojak na gryfy', cena:"78.99 zł", body: 'X', author: 'JUST7GYM', id: 4},
        {photo: "./5.png", title: 'SQUAT BAR', cena:"949.99 zł", body: 'X', author: 'JUST7GYM', id: 5},
       ]);
  
      return ( 
        <div>
           <Navbar/>
           <Sidebar/>
           <div className='content'>  
              {/* <BlogList blogs ={blogs} title='Suplementy'/> */}
              <ItemPromocyjny blogs ={blogs} title='Nowości'/>
           </div>
        </div>
       );
 }
 
 export default Nowosci;