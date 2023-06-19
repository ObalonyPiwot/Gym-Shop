import { useState, useEffect } from 'react';
import Autocomplete from 'react-autocomplete';

const MakeOrder = (props) => {
    const [options, setOptions] = useState([]);
    const [value, setValue] = useState('');
    const [selectedOption, setSelectedOption] = useState(null);
    const [gyms, setGyms] = useState("");
    const [firmID, setFirmID] = useState("");
    const [hasFirm, setHasFirm] = useState(0);
    const [startDate, setStartDate] = useState('');
    const [endDate, setEndDate] = useState('');
    const [description, setDescription] = useState('');
    const [price, setPrice] = useState('');
  
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
      fetch("http://localhost/selectUserFirm/"+props.user.id)
      .then((response) => response.json())
      .then((data) => {
          console.log(data);
          if (data.Status === 'success') {
              firmIDSetter(data.Firmy[0].id);
              data.Firmy[0].id?setHasFirm(1):setHasFirm(0);           
          } else {
              alert("Błąd");
          }
          
      });
      
      }, [props]); 

      function firmIDSetter(value){
          setFirmID(value)
          if(value!==0)
              fetch("http://localhost/selectUserGyms/"+value)
              .then((response) => response.json())
              .then((data) => {
                    const gym = data.Silownie.map((silownia) => ({
                      label: `${silownia.nazwa} ${silownia.adres}`,
                      value: silownia.id,
                    }));
                    setOptions(gym);
              });
      }

      const handleStartDateChange = (e) => {
        const selectedDate = e.target.value;
        setStartDate(selectedDate);
      };
    
      const handleEndDateChange = (e) => {
        const selectedDate = e.target.value;
        setEndDate(selectedDate);
      };
    
      const handleDescriptionChange = (e) => {
        const enteredDescription = e.target.value;
        setDescription(enteredDescription);
      };
    
      const handlePriceChange = (e) => {
        const enteredPrice = e.target.value.replace(',', '.');
        setPrice(enteredPrice);
      };
    
      const handleSubmit = (event) => {
        event.preventDefault();
        const currentDate = new Date().toISOString().slice(0, 10);
        
        if (startDate < currentDate) {
          alert("Data zawarcia nie może być wcześniejsza niż bieżąca data!");
          return false;
        }
      
        if (endDate <= startDate) {
          alert("Data zakończenia musi być późniejsza niż data zawarcia!");
          return false;
        }
      
        
        fetch("http://localhost/makeOrder/"+selectedOption.value+"/"+startDate+"/"+endDate+"/"+description+"/"+price)
          .then((response) => response.json())
          .then((data) => {
              console.log(data);
              if (data.Status === 'Succes') {
                alert("Dodano umowe");
            } else {
                alert("Błąd");
            }
          });
        console.log('Form submitted');
      };
    
      return (
        <>
          <form onSubmit={handleSubmit}>
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
            <br />
            <label>
              Data zawarcia:
              <input
                type="date"
                value={startDate}
                onChange={handleStartDateChange}
              />
            </label>
            <br />
            <label>
              Data zakończenia:
              <input
                type="date"
                value={endDate}
                onChange={handleEndDateChange}
              />
            </label>
            <br />
            <label>
              Opis:
              <textarea value={description} onChange={handleDescriptionChange} />
            </label>
            <br />
            <label>
              Cena:
              <input type="number" value={price} onChange={handlePriceChange} />
            </label>
            <br />
            <button type="submit">
              Zawrzyj umowę
            </button>
            <button onClick={() => props.setAction(0)}>Cofnij</button>
          </form>
        </>
      );
    };
  export default MakeOrder;