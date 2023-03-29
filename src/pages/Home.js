import { useState } from 'react'
import BlogList from '../components/BlogList'
import Navbar from '../components/Navbar';
import Sidebar from '../components/Sidebar';

const Home = () => {

     const[blogs, setBlogs] = useState([
      {photo: "./1.png", title: 'Bidon 1l', cena:"9.99 zł", body: 'Bidon na siłownie to pojemnik służący do przechowywania wody lub innych napojów, które pomogą w utrzymaniu odpowiedniego poziomu nawodnienia podczas treningu. Wykonany z trwałego plastiku, pojemność jeden litr.', author: 'KFD', id: 1},
      {photo: "./6.png", title: 'Erytrytol 1000G', cena:"9.99 zł", body: 'X', author: 'KFD', id: 6},
      {photo: "./7.png", title: 'Delicates kisiel na zimno 259G', cena:"19.99 zł", body: 'X', author: 'KFD', id: 7},
      {photo: "./8.png", title: 'Pure WPC 82 Instant 700G', cena:"49.99 zł", body: 'X', author: 'KFD', id: 8},
      {photo: "./9.png", title: 'Regular WPC 80 750G', cena:"53.99 zł", body: 'X', author: 'KFD', id: 9},
      {photo: "./10.png", title: 'Premium Creatine 250G', cena:"39.00 zł", body: 'X', author: 'KFD', id: 10},
      {photo: "./11.png", title: 'VitaPak+ 90 tab', cena:"39.00 zł", body: 'X', author: 'KFD', id: 11},
      {photo: "./12.png", title: 'Magnesium 160 kaps', cena:"39.00 zł", body: 'X', author: 'KFD', id: 12},
      {photo: "./13.png", title: 'Kremówki Weganki 150G', cena:"21.37 zł", body: 'X', author: 'KFD', id: 13},
      {photo: "./2.png", title: 'Hantle sześciokątne HEX', cena:"78.99 zł", body: 'X', author: 'JUST7GYM', id: 2},
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
            <BlogList blogs ={blogs.filter((blog) => blog.author ==='KFD')} title='Suplementy'/>
            <BlogList blogs ={blogs.filter((blog) => blog.author ==='JUST7GYM')} title='Sprzęt'/>
            <BlogList blogs ={blogs.filter((blog) => blog.id === 1 )} title='Akcesoria'/>
         </div>
      </div>
     );
}
 
export default Home;