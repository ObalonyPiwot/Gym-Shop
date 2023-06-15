import React, { useEffect, useState } from 'react';
import BlogList from '../components/BlogList'
import Navbar from '../components/Navbar';
import Sidebar from '../components/Sidebar';
import PreviewBlog from '../components/PreviewBlog';

const Home = () => {
  const [productData, setProductData] = useState([{photo: "./5.png", count: 1, title: 'SQUAT BAR', cena:"949.99 zł", body: 'X', author: 'JUST7GYM', id: 5}]);
    //  const [productData, setProductData] = useState([
    //   {photo: "./1.png", count: 1, title: 'Bidon 1l', cena:"9.99 zł", body: 'Bidon na siłownie to pojemnik służący do przechowywania wody lub innych napojów, które pomogą w utrzymaniu odpowiedniego poziomu nawodnienia podczas treningu. Wykonany z trwałego plastiku, pojemność jeden litr.', author: 'KFD', id: 1},
    //   {photo: "./6.png", count: 1, title: 'Erytrytol 1000G', cena:"9.99 zł", body: 'X', author: 'KFD', id: 6},
    //   {photo: "./7.png", count: 1, title: 'Delicates kisiel na zimno 259G', cena:"19.99 zł", body: 'X', author: 'KFD', id: 7},
    //   {photo: "./8.png", count: 1, title: 'Pure WPC 82 Instant 700G', cena:"49.99 zł", body: 'X', author: 'KFD', id: 8},
    //   {photo: "./9.png", count: 1, title: 'Regular WPC 80 750G', cena:"53.99 zł", body: 'X', author: 'KFD', id: 9},
    //   {photo: "./10.png", count: 1, title: 'Premium Creatine 250G', cena:"39.00 zł", body: 'X', author: 'KFD', id: 10},
    //   {photo: "./11.png", count: 1, title: 'VitaPak+ 90 tab', cena:"39.00 zł", body: 'X', author: 'KFD', id: 11},
    //   {photo: "./12.png", count: 1, title: 'Magnesium 160 kaps', cena:"39.00 zł", body: 'X', author: 'KFD', id: 12},
    //   {photo: "./13.png", count: 1, title: 'Kremówki Weganki 150G', cena:"21.37 zł", body: 'X', author: 'KFD', id: 13},
    //   {photo: "./2.png", count: 1, title: 'Hantle sześciokątne HEX', cena:"78.99 zł", body: 'X', author: 'JUST7GYM', id: 2},
    //   {photo: "./3.png", count: 1, title: 'Uchwyt do wyciągu', cena:"78.99 zł", body: 'X', author: 'JUST7GYM', id: 3},
    //   {photo: "./4.png", count: 1, title: 'Stojak na gryfy', cena:"78.99 zł", body: 'X', author: 'JUST7GYM', id: 4},
    //   {photo: "./5.png", count: 1, title: 'SQUAT BAR', cena:"949.99 zł", body: 'X', author: 'JUST7GYM', id: 5},
    //  ]);
  useEffect(() => {
   const fetchData = async () => {
      try {
        const response = await fetch('http://localhost/selectProducts');
        const data = await response.json();
        const productList = data.Produkty.map(async (product) => {
          const photoResponse = await fetch('http://localhost/getPhoto', {
            method: 'POST',
            body: product.zdjecie, 
            headers: {
              'Content-Type': 'application/json'
            }
          });
          // const photoData = await photoResponse.blob(); 
          // const photoUrl = URL.createObjectURL(photoData);

        
          return {
            id: product.id,
            title: product.nazwa,
            body: product.opis,
            cena: product.cena,
            photo: photoResponse,
            idGrupy: product.idGrupy,
            onPromotion: product.onPromotion,
            count: 1
          };
        });
        const productListWithPhotos = await Promise.all(productList);
        setProductData(productListWithPhotos);
        
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
         <Sidebar/>

         <div className='content'>  
            {/* <BlogList blogs ={blogs} title='Suplementy'/> */}
            <BlogList blogs ={productData} id='suplementy' title='Suplementy' childToParent={childToParent}/>
            {/* <BlogList blogs ={productData.filter((product) => product.author ==='JUST7GYM')} id='sprzet'  title='Sprzęt' childToParent={childToParent}/>
            <BlogList blogs ={productData.filter((product) => product.id === 1 )} id='akcesoria' title='Akcesoria' childToParent={childToParent}/> */}
         </div>
      </div>
     );
};

export default Home;