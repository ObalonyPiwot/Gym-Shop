import { useState, useEffect } from 'react';
import Autocomplete from 'react-autocomplete';

const DeleteProducts = (props) => {

    const [options, setOptions] = useState([]);
    const [value, setValue] = useState('');
    const [selectedOption, setSelectedOption] = useState(null);
  
    const handleSelect = (value, option) => {
      setValue(value);
      setSelectedOption(option);
    };
  
    const renderItem = (item, isHighlighted) => (
      <div
        key={item.id}
        style={{ background: isHighlighted ? 'blue' : 'red' }}
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
        console.log(options)
      })
      .catch((error) => {
        console.log(error);
      });
      }, []);

      const del = (event) => {
        event.preventDefault();
        fetch("http://localhost/deleteProduct/"+selectedOption.value)
          .then((response) => response.json())
          .then((data) => {
              console.log(data);
          });
        console.log('Form submitted');
      };

    return(<>
    <h2>Aktualizuj produkt</h2>
    <form onSubmit={del}>
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
    <button group='submit'>Usuń</button>
    <button onClick={() => props.setAction(0)}>Cofnij</button>
    </form>
    </>
    );
  };
  export default DeleteProducts;