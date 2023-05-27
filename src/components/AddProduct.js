import { useState, useEffect } from 'react';

const AddProduct = (props) => {
    const [productName, setProductName] = useState('');
    const [productDescription, setProductDescription] = useState('');
    const [productPrice, setProductPrice] = useState('');
    const [selectedCategory, setSelectedCategory] = useState('');
    const [selectedGroup, setSelectedGroup] = useState('');
    const [categoryList, setCategoryList] = useState('');
    const [groupList, setGroupList] = useState([]);
  
    useEffect(() => {
        fetch("http://localhost/selectCategories")
          .then((response) => response.json())
          .then((data) => {
            const categories = data.Kategorie.map((kategoria) => (
                <option key={kategoria.id} value={kategoria.id}>
                {kategoria.nazwa}
                </option>
            ));
            setCategoryList(categories);
          });
          

          fetch("http://localhost/selectGroups")
          .then((response) => response.json())
          .then((data) => {
            console.log(data);
            const maxIdKat = Math.max(...data.Grupy.map((grupa) => grupa.idKat));
            const List = [];
        
            for (let i = 1; i <= maxIdKat; i++) {
              const options = data.Grupy
                .filter((grupa) => grupa.idKat === i)
                .map((grupa) => (
                  <option key={grupa.id} value={grupa.id}>
                    {grupa.nazwa}
                  </option>
                ));
        
                List[i] = options;
            }
        
            setGroupList(List);
          });
      }, []);

    const handleSubmit = (event) => {
      event.preventDefault();
      fetch("http://localhost/insertProduct/"+productName+"/"+productDescription+"/"+productPrice+"/"+selectedGroup)
        .then((response) => response.json())
        .then((data) => {
            console.log(data);
        });
      console.log('Form submitted');
    };
  
    return (
      <>
        <h2>Dodaj produkt</h2>
        <form onSubmit={handleSubmit}>
          <label htmlFor="nazwa">Nazwa</label>
          <input
            group="text"
            placeholder="Nazwa produktu"
            id="nazwa"
            name="nazwa"
            value={productName}
            onChange={(e) => setProductName(e.target.value)}
            required
          />
          <br />
  
          <label htmlFor="opis">Opis</label>
          <textarea
            placeholder="Opis produktu"
            id="opis"
            name="opis"
            value={productDescription}
            onChange={(e) => setProductDescription(e.target.value)}
            required
          ></textarea>
          <br />
  
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
          <br />
  
          <button group="submit">Zatwierdź</button>
          <button onClick={() => props.setAction(0)}>Cofnij</button>
        </form>
      </>
    );
  };
  export default AddProduct;