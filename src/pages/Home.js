import { useState } from 'react'
import BlogList from '../components/BlogList'
import Navbar from '../components/Navbar';
import Sidebar from '../components/Sidebar';

const Home = () => {

     const[blogs, setBlogs] = useState([
        {photo: "./bidon.png", title: 'Bidon 1l', cena:"9.99 zł", body: 'Bidon na siłownie to pojemnik służący do przechowywania wody lub innych napojów, które pomogą w utrzymaniu odpowiedniego poziomu nawodnienia podczas treningu. Wykonany z trwałego plastiku, pojemność jeden litr.', author: 'KFD', id: 1},
        {photo: "./hantle.png", title: 'title2', cena:10, body: 'body2', author: 'author2', id: 2},
        {photo: "./pwr.png", title: 'title3', cena:10, body: 'body3', author: 'author2', id: 3}
     ]);

    return ( 
      <div>
         <Navbar/>
         <Sidebar/>
         <div className='content'>  
            <BlogList blogs ={blogs} title='Suplementy'/>
            <BlogList blogs ={blogs.filter((blog) => blog.author ==='author2')} title='Akcesoria'/>
         </div>
      </div>
     );
}
 
export default Home;