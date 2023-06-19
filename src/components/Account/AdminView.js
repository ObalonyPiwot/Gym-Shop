import { useState, useEffect } from 'react';
import GetSaleCodes from "../ForAdmin/GetSaleCodes";
import AddProduct from "../ForAdmin/AddProduct";
import SetPromotion from "../ForAdmin/SetPromotion";
import DeleteProducts from "../ForAdmin/DeleteProducts";
import ChceckOrders from "../ForAdmin/ChceckOrders";
import CheckComplains from "../ForAdmin/CheckComplains";

import { useAlert } from "react-alert";
const AdminView = (props) => {
    const [kody, setKody] = useState("");
    const [action, setAction] = useState(0);
    const alert = useAlert();
    
    const GenerateSaleCodes= () => {

        let amount=0;
        let percent=0;
        let time;

        return(<>
        <h2>Generuj kody rabatowe</h2>
            <form   onSubmit={(e) => {
                fetch("http://localhost/generateSaleCodes/"+amount+"/"+percent+"/"+time)
                .then((response) => response.json())
                .then((data) => {
                    console.log(data);
                    if(data.Status==="success"){
                        alert.success("Dodano kody rabatowe");
                            setTimeout(() => {
                                alert.removeAll();
                            }, 2000);
                }});
                e.preventDefault();
            }}
            >
                <label htmlFor='amount'>Ilość kodów</label>
                <input type="number" id='amount' name='amount' min="1"  onChange = {(e) => { const input = e.target.value; 
                    if (/^\d{0,9}$/.test(input)) amount = input}} required/>
                <br/>
                <label htmlFor='percent'>% rabatu</label>
                <input type="number" id='percent' name='percent' min="1" max="100" onChange = {(e) =>{ const input = e.target.value; 
                    if (/^\d{0,9}$/.test(input)) percent = input}} required/>
                <br/>
                <label htmlFor='time'>Czas aktywności (dni)</label>
                <input type="number" id='time' name='time' min="1" onChange = {(e) => { const input = e.target.value; 
                    if (/^\d{0,9}$/.test(input)) time = input}} required/>
                <br/>
                <button type ='submit'>Zatwierdź</button>
                <button onClick={() => setAction(0)}>Cofnij</button>
            </form>
        </>
        );
      };

   
    return ( 
        <>
        <div className='content2'>
            <div className='logging'>
            {action===0 && (
                 <>
                <h2>Panel Admina</h2>
                <button onClick={() => setAction(1)}>Dodaj produkt</button>
                <button onClick={() => setAction(2)}>Aktualizuj produkt</button>
                <button onClick={() => setAction(3)}>Usuń produkt</button>
                <button onClick={() => setAction(4)}>Generuj kody rabatowe</button>
                <button onClick={() => setAction(5)}>Wyświetl aktywne kody rabatowe</button>
                <button onClick={() => setAction(6)}>Wyświetl umowy</button>
                <button onClick={() => setAction(7)}>Wyświetl reklamacje</button>
                <button onClick={() => props.changeState(0)}>Anuluj</button>
                </>
                )}
                {action===1 &&(
                    <AddProduct setAction = {setAction}/>
                )}
                {action===2 &&(
                    <SetPromotion setAction = {setAction}/>
                )}
                {action===3 &&(
                    <DeleteProducts setAction = {setAction}/>
                )}
                {action===4 &&(
                    GenerateSaleCodes()
                )}
                {action===5 &&(
                    <GetSaleCodes setAction = {setAction}/>
                )}
                {action===6 &&(
                    <ChceckOrders setAction = {setAction}/>
                )}
                {action===7 &&(
                    <CheckComplains setAction = {setAction}/>
                )}
            </div>
        </div>
        </>
     );
 }

 export default AdminView;