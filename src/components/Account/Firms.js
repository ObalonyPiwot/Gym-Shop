import { useState, useEffect } from 'react';
import AddFirm from "../ForFirms/AddFirm";
import AddGym from "../ForFirms/AddGym";
import MakeOrder from "../ForFirms/MakeOrder";
//import PhotoViewer from '../PhotoViewer';

const Firms = (props) => {
    const [action, setAction] = useState(0);
    return (
    <>
        <div className='content2'>
            <div className='logging'>
            {action===0 && (
                 <>
                <h2>Panel dla Firm</h2>
                <button onClick={() => setAction(1)}>Moja Firma</button>
                <button onClick={() => setAction(2)}>Moje Siłownie</button>
                <button onClick={() => setAction(3)}>Zawrzyj umowę</button>
                <button onClick={() => props.changeState(0)}>Cofnij</button>
                </>
                )}
                {action===1 &&(
                    <AddFirm user={props.user} setAction = {setAction}/>
                )}
                {action===2 &&(
                    <AddGym user={props.user} setAction = {setAction}/>
                )}
                {action===3 &&(
                    <MakeOrder user={props.user} setAction = {setAction}/>
                )}
            </div>
        </div>
    </>
    );
  };
  export default Firms;