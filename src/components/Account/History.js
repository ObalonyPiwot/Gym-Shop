import { useState, useEffect } from 'react';
import { getDataTransaction } from '../API_Communication/CartDataAPI';
import '../Cart_Data/cart.css'
import HistoryList from './History/HistoryList';
import { getCookie } from '../../CookieFunction';


const History = (props) => {

    const [blogs, setBlogs] = useState([]);

    useEffect(() => {
        fetch('http://localhost/api/payment/getTransactionHistory', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            userID: JSON.parse(getCookie("USER_DATA")).id
        },

    })
        .then(response => response.text())
        .catch(error => alert(error.message))
        .then(result => {
            const json = JSON.parse(result);
            const transformed = Object.entries(json.Transakcje).map(([key, value]) => ({
                id: value.id,
                data: value.data,
                dane: value.dane,
                cena: value.cena,
                ilosc: value.ilosc,
                czySukces: value.czySukces,
            }));
            setBlogs(transformed);
            console.log("TEST ",blogs);
        })
    }, [])

    return (
        <>
            <div className='cartContent'>
                <div className='koszyk'>
                    <div>
                        <div className='koszykTitle'>
                            <h2>Historia</h2>
                        </div>
                        <div className='list'>
                            <HistoryList blogs={blogs}/>
                            {/* <CartList blogs={blogs} handleBlogs={setBlogs} /> */}
                        </div>
                    </div>
                </div>
            </div>
            <div className='content2'>
                <div className='logging'>
                    <h2>Historia Zakupów</h2>
                    <button onClick={() => props.changeState(0)}>Anuluj</button>
                </div>
            </div>
        </>
    );
}

export default History;