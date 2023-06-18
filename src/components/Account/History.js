import { useState, useEffect } from 'react';
import { getDataTransaction } from '../API_Communication/CartDataAPI';


const History = (props) => {

    useEffect( ()=>{
        getDataTransaction();
    }, [])      
   
    return ( 
        <>
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