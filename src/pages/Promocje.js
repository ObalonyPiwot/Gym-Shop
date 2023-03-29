import { useState } from 'react'
import ItemPromocyjny from '../components/ItemPromocyjny'
import Navbar from '../components/Navbar';
import Sidebar from '../components/Sidebar';

const Promocje = () => {

    const[blogs, setBlogs] = useState([
        {photo: "./13.png", title: 'Kremówki Weganki 150G', cena:"2̶1̶.3̶7zł 16.99zł",  body: 'X', author: 'KFD', id: 13},
        {photo: "./2.png", title: 'Hantle sześciokątne HEX', cena:"7̶8̶.9̶9zł 60.00zł", body: 'X', author: 'JUST7GYM', id: 2},
        {photo: "./3.png", title: 'Uchwyt do wyciągu', cena:"7̶8̶.9̶9zł 55.99zł", body: 'X', author: 'JUST7GYM', id: 3},
        {photo: "./5.png", title: 'SQUAT BAR', cena:"9̶4̶9̶.9̶9zł 859.99zł", body: 'X', author: 'JUST7GYM', id: 5},
       ]);
  
      return ( 
        <div>
           <Navbar/>
           <Sidebar/>
           <div className='content'>  
              {/* <BlogList blogs ={blogs} title='Suplementy'/> */}
              <ItemPromocyjny blogs ={blogs} title='Promocje'/>
           </div>
        </div>
       );
 }
 
 export default Promocje;