import { useState, useEffect } from 'react';
import Autocomplete from 'react-autocomplete';
const SetPromotion = (props) => {

    const [options, setOptions] = useState([]);
    const [value, setValue] = useState('');
    const [productPrice, setProductPrice] = useState('');
    const [onPromotion, setOnPromotion] = useState('');
    const [selectedOption, setSelectedOption] = useState(null);
    const handleSelect = (value, option) => {
      setValue(value);
      setSelectedOption(option);
      setProductPrice(option.value[1]);
      setOnPromotion(option.value[2] === 1 ? true : false);
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
          value: [produkt.id, produkt.cena, produkt.onPromotion],
        }));
        setOptions(products);
        console.log(options)
      })
      .catch((error) => {
        console.log(error);
      });
        
      }, []);


      const add = (event) => {
        event.preventDefault();
        let bool = onPromotion? 1 : 0;
        fetch("http://localhost/updateProduct/"+selectedOption.value[0]+"/"+productPrice+"/"+bool)
          .then((response) => response.json())
          .then((response) => {
            console.log(response);
              if(response.Status==="success"){
                    alert("Zaaktualizowano produkt");
                    const updatedOptions = options.map((option) => {
                      if (option.value[0] === selectedOption.value[0]) {
                        return {
                          ...option,
                          value: [option.value[0], productPrice, option.value[2]],
                        };
                      }
                      return option;
                    });
                    setOptions(updatedOptions);
                    setValue('');
                    setProductPrice('');
                    setOnPromotion(0);
              }
          });
      };

    return(<>
    <h2>Aktualizuj produkt</h2>
    <form onSubmit={add}>
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
     <label htmlFor="cena">Cena</label>
          <input
            group="number"
            placeholder="Cena produktu"
            step="0.01"
            id="cena"
            name="cena"
            min="0"
            max="9999.99"
            value={productPrice}
            onChange={(e) => setProductPrice(e.target.value.replace(',', '.'))}
            required
          />
      <br />
      <label htmlFor="cena">Promocja</label>
      <input
        type="checkbox"
        id="promocja"
        checked={onPromotion}
        onChange={(event) => {
          setOnPromotion(event.target.checked);
        }}
        />
      <br />
    <button group='submit'>Zapisz</button>
    <button onClick={() => props.setAction(0)}>Cofnij</button>
    </form>
        {/* <form onSubmit={handleSubmit}>
        <label htmlFor="kategoria">Kategoria</label>
          <select
            id="kategoria"
            name="kategoria"
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            required
          >
            <option value="">Wybierz kategorię</option>
            {categoryList}
          </select>
          <br />
  
          <label htmlFor="grupa">Grupa</label>
          <select
            id="grupa"
            name="grupa"
            value={selectedGroup}
            onChange={(e) => setSelectedGroup(e.target.value)}
            required
          >
            <option value="">Wybierz grupę</option>
            {groupList[selectedCategory]}
          </select>
            <button group="submit">Wyszukaj</button>
            <button onClick={() => props.setAction(0)}>Cofnij</button>
        </form>

        <form>
        <label htmlFor="produkt">Produkt</label>
          <select
            id="produkt"
            name="produkt"
            value={selectedProduct}
            onChange={(e) => setSelectedProduct(e.target.value)}
            required
          >
            <option value="">Wybierz produkt</option>
            {productList}
          </select>
        </form> */}
    </>
    );
  };
  export default SetPromotion;