import { useState, useEffect } from 'react';


const Favourite = (props) => {
   
    return ( 
        <>
        <div className='content2'>
            <div className='logging'>
            <h2>Ulubione</h2>
            <button onClick={() => props.changeState(0)}>Anuluj</button>
            </div>
        </div>
        </>
     );
 }

 export default Favourite;