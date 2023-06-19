/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useState } from 'react';
import './history.css'
import { useEffect } from 'react';
import PaymentPreview from '../../Cart_Data/Payment_API/PaymentPreview';

const HistoryDetail = ({ blog, changeState, history }) => {

    const [blogs, setBlogs] = useState(blog);
    const [items, setItems] = useState(JSON.parse(blog.dane));
    const [showPayment, setPayment] = useState(0);

    // useEffect(() => {
    //     const transformed = Object.entries(blogs).map(([key, value]) => ({
    //         id: value.id,
    //         data: value.data,
    //         dane: value.dane,
    //         cena: value.cena,
    //         ilosc: value.ilosc,
    //         czySukces: value.czySukces,
    //     }));
    //     setBlogs(transformed);
    // }, [])
    const togglePayment = (data) =>{
        setPayment(data);
    }
    
    let okno;
    if(showPayment){
       okno = <PaymentPreview item={blog} closePreview={togglePayment}/>
    } else {
       okno = <></>;
    }

   
    
    return (
        <div>
            {okno}
            <div className='cartContent'>

                <div className='koszyk'>
                    <div className='backButton'>
                        <a href="#S" onClick={() => changeState(0)}>
                            {'<<<WRÓĆ'}
                        </a>
                        {/* <a href="#SSS" onClick={() => console.log(blog)}>
                            TEST
                        </a> */}
                    </div>
                    <div>
                        <div className='koszykTitle'>
                            <h2>Szcegóły płatności</h2>
                        </div>
                        <div className='CartPreview ItemDetail'>
                            <table className='historyPreview'>
                                <thead className='tableHistory'>
                                    <tr className='historyHead'>
                                        <th>NumerZamówienia</th>
                                        <th>Kwota</th>
                                        <th>Data</th>
                                        <th>Status</th>
                                        {blog.czySukces === 'F' && (<th className='backButton' rowSpan="2"><a href='#sss' onClick={() => setPayment(1)}>Przejdz do płatności </a></th>)}
                                    </tr>
                                </thead>
                                <tbody className='tableHistory'>
                                    <tr className='bodyTr'>
                                        <td>
                                            {blogs.id}
                                        </td>
                                        <td>
                                            {blogs.cena}
                                        </td>
                                        <td>
                                            {blogs.data}
                                        </td>
                                        <td>
                                            {blogs.czySukces === 'T' ? "Zapłacono" : "Nie Zapłacono"}
                                        </td>
                                        {/* {blog.czySukces === 'F' && (<td><a href='#s'> Zapłać </a></td>)} */}

                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>
                    <div>
                        <div className='koszykTitle'>
                            <h2>Szcegóły zamówienia</h2>
                        </div>
                        <div className='CartPreview ItemDetail'>
                            <table className='historyPreview'>
                                <thead className='tableHistory'>
                                    <tr className='historyHead'>
                                        <th>Produkt</th>
                                        <th>Ilosc</th>
                                        <th>Cena</th>
                                        <th>Razem</th>
                                    </tr>
                                </thead>
                                <tbody className='tableHistory'>
                                    {items.map((blog, index) => {

                                        return (
                                            <tr key={index} className='bodyTr'>
                                                <td>
                                                    <div className="image">
                                                        <img src={blog.photo} alt={blog.title} />
                                                    </div>
                                                    <div className="text">
                                                        <div className="top">
                                                            <p>{blog.title}</p>
                                                        </div>
                                                    </div>
                                                </td>
                                                <td>
                                                    {blog.count}
                                                </td>
                                                <td>
                                                    {blog.cena} zł
                                                </td>
                                                <td>
                                                    {blog.cena * blog.count} zł
                                                </td>
                                            </tr>
                                        )
                                    })}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>

        </div>
    )
}

export default HistoryDetail;