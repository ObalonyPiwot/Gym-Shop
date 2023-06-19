import { useState, useEffect } from 'react';
import { getCookie } from "../../CookieFunction";
import Autocomplete from 'react-autocomplete';
const Complaints = (props) => {

  const [options, setOptions] = useState([]);
  const [value, setValue] = useState('');
  const [selectedOption, setSelectedOption] = useState(null);
  const [complaintDescription, setComplaintDescription] = useState('');
  const handleSelect = (value, option) => {
    setValue(value);
    setSelectedOption(option);
  };

  const renderItem = (item, isHighlighted) => (
    <div
      key={item.id}
      style={{ background: isHighlighted ? 'black' : 'gray' }}
    >
      {item.label}
    </div>
  );
  useEffect(() => {
    fetch("http://localhost/selectProducts")
    .then((response) => response.json())
    .then((data) => {
      const products = data.Produkty.map((produkt) => ({
        label: `${produkt.nazwa}`,
        value: produkt.id,
      }));
      setOptions(products);
      console.log(products)
    })
    .catch((error) => {
      console.log(error);
    });
    }, []);

  
    const handleSubmit = (e) =>{
      let validateData = {
        opis: complaintDescription,
        idProd: selectedOption.value,
      };
      
      const sessionCookie = getCookie("SESSION-ID");
      fetch("http://localhost/addComplain", {
        method: 'POST',
        headers: {
            'SESSIONID': sessionCookie,
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(validateData)
    })
      .then((response) => response.json())
      .then((data) => {
          console.log(data);
          if (data.Status === 'success') {
              alert("Dodano reklamację");
          } else {
              alert("Błąd");
          }
      })
      e.preventDefault();

  }
    return ( 
        <>
        <div className='content2'>
            <div className='logging'>
            <h2>Reklamacje</h2>
            <form onSubmit={handleSubmit}>
            <label htmlFor="nazwa">Product</label><br/>
            <Autocomplete
              value={value}
              items={options}
              getItemValue={(item) => item.label}
              shouldItemRender={(item, inputValue) =>
                item.label.toLowerCase().includes(inputValue.toLowerCase())
              }
              onChange={(e) => setValue(e.target.value)}
              onSelect={handleSelect}
              renderItem={renderItem}
              inputProps={{ placeholder: 'Search' }}
            />
            <br/>
            <label htmlFor="nazwa">Opisz swoją reklamację</label><br/>
        <textarea
            placeholder="Opis reklamacji"
            id="opis"
            name="opis"
            value={complaintDescription}
            onChange={(e) => setComplaintDescription(e.target.value)}
            required
          ></textarea>

            <button type ='submit'>Wyślij</button>
            <button onClick={() => props.changeState(0)}>Anuluj</button>
            </form>
            </div>
        </div>
        </>
     );
 }

 export default Complaints;