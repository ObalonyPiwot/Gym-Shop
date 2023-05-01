import { FaTrash } from 'react-icons/fa';
import React, { useState } from 'react';

const CartList = ({ blogs, handleBlogs }) => {


    const [count, setCount] = useState(blogs.map(blog => blog.count));

    const handleQuantityChange = (index, event) => {
        const newCount = [...count];
        newCount[index] = event.target.value;
        setCount(newCount);

        const newBlogs = [...blogs];
        newBlogs[index].count = event.target.value;
        handleBlogs(newBlogs);
    };

    return (
        <div className="blogCart">
            {blogs.map((blog, index) => {

                const photo = blog.photo;
                let src = require(`${photo}`);
                const currentCount = count[index];
                const currentPrice = parseFloat(blog.cena).toFixed(2) * blog.count;

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
                                <input
                                    type="number"
                                    className="quantity"
                                    min="1" max="99"
                                    placeholder={blog.count}
                                    onChange={(event) => {handleQuantityChange(index, event);}}
                                />
                                <p className="cena"> {currentPrice} zł</p>
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