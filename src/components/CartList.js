/* eslint-disable jsx-a11y/anchor-is-valid */
import { FaTrash } from 'react-icons/fa';
import React, { useState } from 'react';
import { deleteSpecificDataFromSession } from './API_Communication/CartDataAPI';
import { useAlert } from 'react-alert';

const CartList = ({ blogs, handleBlogs }) => {


    const [count, setCount] = useState(blogs.map(blog => blog.count));
    const alert = useAlert();

    const handleQuantityChange = (index, event) => {
        const newCount = [...count];
        newCount[index] = event.target.value;
        setCount(newCount);

        const newBlogs = [...blogs];
        newBlogs[index].count = event.target.value;
        handleBlogs(newBlogs);
    };

    function _showAlert(){
        alert.success("Usunięto produkt");
    }

 return (
        <div className="blogCart">
            {blogs.map((blog, index) => {
                // let src = require(`${photo}`);
                const currentPrice = (parseFloat(blog.cena) * blog.count).toFixed(2);

                return (
                    <div className='CartPreview' key={blog.id}>
                        <div className="image">
                            <img src={blog.photo} alt={blog.title} />
                        </div>
                        <div className="text">
                            <div className="top">
                                <p>{blog.title}</p>
                                <p className="cena"> {blog.cena}</p>
                            </div>
                            <div className="middle">
                                <input
                                    type="number"
                                    className="quantity"
                                    min="1" max="99"
                                    placeholder={blog.count}
                                    onChange={(event) => { handleQuantityChange(index, event); }}
                                />
                                <p className="cena"> {currentPrice} zł</p>
                            </div>
                            <div className="bottom">
                                <div className='trash TrashIcon' onClick={ () =>{_showAlert(); deleteSpecificDataFromSession(blog.title);}}>
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