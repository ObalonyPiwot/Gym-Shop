import { useState, useEffect } from 'react';
import Autocomplete from 'react-autocomplete';

const SetPromotion = (props) => {
    const [selectedCategory, setSelectedCategory] = useState('');
    const [selectedGroup, setSelectedGroup] = useState('');
    const [selectedProduct, setSelectedProduct] = useState('');
    const [categoryList, setCategoryList] = useState('');
    const [groupList, setGroupList] = useState([]);
    const [productList, setProductList] = useState('');
    const [products, setProducts] = useState(0);
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
          value: [produkt.id, produkt.cena, produkt.onPromotion],
        }));
        setOptions(products);
        console.log(options)
      })
      .catch((error) => {
        console.log(error);
      });
        // fetch("http://localhost/selectCategories")
        //   .then((response) => response.json())
        //   .then((data) => {
        //     const categories = data.Kategorie.map((kategoria) => (
        //         <option key={kategoria.id} value={kategoria.id}>
        //         {kategoria.nazwa}
        //         </option>
        //     ));
        //     setCategoryList(categories);
        //   });
          

        //   fetch("http://localhost/selectGroups")
        //   .then((response) => response.json())
        //   .then((data) => {
        //     console.log(data);
        //     const maxIdKat = Math.max(...data.Grupy.map((grupa) => grupa.idKat));
        //     const List = [];
        
        //     for (let i = 1; i <= maxIdKat; i++) {
        //       const options = data.Grupy
        //         .filter((grupa) => grupa.idKat === i)
        //         .map((grupa) => (
        //           <option key={grupa.id} value={grupa.id}>
        //             {grupa.nazwa}
        //           </option>
        //         ));
        
        //         List[i] = options;
        //     }
        
        //     setGroupList(List);
        //   });
      }, []);

      const handleSubmit= (e) => {
        e.preventDefault();
        // fetch("http://localhost/selectProducts/"+selectedGroup)
        // .then((response) => response.json())
        // .then((data) => {
        //   console.log(data);
        //   const products = data.Produkty.map((produkt) => (
        //       <option key={produkt.id} value={produkt.id}>
        //       {produkt.nazwa}
        //       </option>
        //   ));
          
        //   setProductList(products);
        //   setProducts(1);
        // });

      };

      const add = (event) => {
        event.preventDefault();
        fetch("http://localhost/updateProduct/"+selectedOption.value[0]+"/"+productPrice+"/"+onPromotion)
          .then((response) => response.json())
          .then((data) => {
              console.log(data);
          });
        console.log('Form submitted');
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
            onChange={(e) => setProductPrice(e.target.value)}
            required
          />
      <br />
      <label htmlFor="cena">Promocja</label>
      <input
        type="checkbox"
        id="promocja"
        checked={onPromotion}
        onChange={(event) => {
          const newValue = event.target.checked ? 1 : 0;
          setOnPromotion(newValue);
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