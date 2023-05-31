import { useState, useEffect } from 'react';
import GetSaleCodes from "../ForAdmin/GetSaleCodes";
import AddProduct from "../ForAdmin/AddProduct";
import SetPromotion from "../ForAdmin/SetPromotion";
import DeleteProducts from "../ForAdmin/DeleteProducts";

const AdminView = (props) => {
    const [kody, setKody] = useState("");
    const [action, setAction] = useState(0);
    
    const DeleteProduct= () => {
        return(<>
        <h2>Usuń produkt</h2>
            <form onSubmit={console.log("aaa")}>
                <label htmlFor='ID'>ID Produktu</label>
                <input  id='ID"' name='ID' required/>
                <br/>
                <button type ='submit'>Zatwierdź</button>
                <button onClick={() => setAction(0)}>Cofnij</button>
            </form>
        </>
        );
      };
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
                });
                e.preventDefault();
            }}
            >
                <label htmlFor='amount'>Ilość kodów</label>
                <input type="number" id='amount' name='amount' min="1"  onChange = {(e) => amount= e.target.value} required/>
                <br/>
                <label htmlFor='percent'>% rabatu</label>
                <input type="number" id='percent' name='percent' min="1" max="100" onChange = {(e) => percent= e.target.value} required/>
                <br/>
                <label htmlFor='time'>Czas aktywności (dni)</label>
                <input type="number" id='time' name='time' min="1" onChange = {(e) => time= e.target.value} required/>
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
            </div>
        </div>
        </>
     );
 }

 export default AdminView;