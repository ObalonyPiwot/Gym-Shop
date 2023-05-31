import { useState, useEffect } from 'react';

const GetSaleCodes = (props) => {
    const [kody, setKody] = useState("");

    useEffect(() => {
        fetch("http://localhost/selectSaleCodes")
          .then((response) => response.json())
          .then((data) => {
            setKody(data.Kody.map((kod) => (
              <div key={kod.id}>
                <h3>Kod: {kod.kod}</h3>
                <p>Rabat: {kod.rabat} Data ważności: {kod.dataWaznosci} Czy użyty: {kod.czyUzyty}</p>
              </div>     
            )));
          });
      }, []);
          
    return (
    <>
        <h2>Kody rabatowe</h2>
        {kody}
        <button onClick={() => props.setAction(0)}>Cofnij</button>
    </>
    );
  };
  export default GetSaleCodes;