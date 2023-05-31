import { useState, useEffect } from 'react';


const History = (props) => {
   
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