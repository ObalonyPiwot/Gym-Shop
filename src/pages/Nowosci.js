import { useState, useEffect } from 'react'
import BlogList from '../components/BlogList';
import Navbar from '../components/Navbar';
import Sidebar from '../components/Sidebar';
import PreviewBlog from '../components/PreviewBlog';

const Nowosci = () => {

   const [productData, setProductData] = useState([{photo: "./5.png", count: 1, title: 'SQUAT BAR', cena:"949.99 zł", body: 'X', author: 'JUST7GYM', id: 5}]);
   const [groupList, setGroupList] = useState([]);
   const [cat, setCat] = useState(1);
       useEffect(() => {
         const fetchData = async () => {
            try {
              const response = await fetch('http://localhost/selectNewest');
              const data = await response.json();
              const productList = data.Produkty.map(async (product) => {
                const photoResponse = await fetch('http://localhost/getPhoto', {
                  method: 'POST',
                  body: product.zdjecie, 
                  headers: {
                    'Content-Type': 'application/json'
                  }
                });
                const photoData = await photoResponse.blob(); 
                const photoUrl = URL.createObjectURL(photoData);
              
                return {
                  id: product.id,
                  title: product.nazwa,
                  body: product.opis,
                  cena: product.cena,
                  photo: photoUrl,
                  idGrupy: product.idGrupy,
                  onPromotion: product.onPromotion,
                  count: 1
                };
              });
              const productListWithPhotos = await Promise.all(productList);
              console.log(productListWithPhotos);
              setProductData(productListWithPhotos);
    
              await fetch("http://localhost/selectGroups")
              .then((response) => response.json())
              .then((data) => {
               const groups = data.Grupy;
               setGroupList(groups);
                
              });
              
            } catch (error) {
              console.error('Error:', error);
            }
          };
      
          fetchData();
          
        }, []);
        const [data, setData] = useState('');
        const childToParent = (childData) => {
         setData(childData);
        }
      let okno;
      if(data){
         okno = <PreviewBlog item={data} childToParent={childToParent}/>
      } else {
         okno = <></>;
      }
        return ( 
         <div>
            {okno}
            <Navbar/>
            <Sidebar setCat={setCat}/>
            <div className='content'>  
            {groupList
               .filter((group) => group.idKat === cat)
               .map((group) => (
                  <BlogList
                  key={group.id}
                  blogs={productData.filter((product) => product.idGrupy === group.id)}
                  id={group.nazwa}
                  title={group.nazwa}
                  childToParent={childToParent}
               />
            ))}
            </div>
         </div>
        );
   };
 
 export default Nowosci;