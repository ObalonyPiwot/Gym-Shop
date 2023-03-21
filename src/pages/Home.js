import { useState } from 'react'
import BlogList from '../BlogList'

const Home = () => {

     const[blogs, setBlogs] = useState([
        {title: 'title1', body: 'body1', author: 'author1', id: 1},
        {title: 'title2', body: 'body2', author: 'author2', id: 2},
        {title: 'title3', body: 'body3', author: 'author2', id: 3}
     ]);

    return ( 
        <div className="home">
           <BlogList blogs ={blogs} title='tytuł'/>
           <BlogList blogs ={blogs.filter((blog) => blog.author ==='author2')} title='tylko author2'/>
        </div>
     );
}
 
export default Home;