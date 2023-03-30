import { FaTrash } from 'react-icons/fa';

const CartList = ({blogs}) => {
    return (

        <div className="blogCart">
                {blogs.map((blog) => {
                    const photo = blog.photo;
                    let src = require(`${photo}`);
                    return (
                        <div className='CartPreview' key={blog.id}>
                            <div class="image">
                                <img src={src} alt={blog.title} />
                            </div>
                            <div class="text">
                                <div class="top">
                                    <p>{blog.title}</p>
                                    <p className="cena"> {blog.cena}</p>
                                </div>
                                <div class="middle">
                                    <input type="number" className="quantity" min="1" max="99" />
                                    <p className="cena"> {blog.cena}</p>
                                </div> 
                                <div className="bottom">
                                    <div className='trash'>
                                        <FaTrash />
                                    </div>
                                </div>
                            </div>
                        </div>
                    )
                })}
        </div>
    );
}

export default CartList;