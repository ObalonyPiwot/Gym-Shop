import { useState } from 'react'
import BlogList from '../BlogList'
import Navbar from '../components/Navbar';
import Sidebar from '../components/Sidebar';

const Home = () => {

     const[blogs, setBlogs] = useState([
        {title: 'title1', body: 'body1', author: 'author1', id: 1},
        {title: 'title2', body: 'body2', author: 'author2', id: 2},
        {title: 'title3', body: 'body3', author: 'author2', id: 3}
     ]);

    return ( 
      <div>
         <Navbar/>
         <Sidebar/>
         <div className='content'> 
            <button onClick={() => fetch("http://localhost/test")
                                    .then((response) => response.json())
                                    .then((data) => console.log(data))
                                    }>Baza</button>
            <BlogList blogs ={blogs} title='tytuł'/>
            <BlogList blogs ={blogs.filter((blog) => blog.author ==='author2')} title='tylko author2'/>
         </div>
      </div>
     );
}
 
export default Home;