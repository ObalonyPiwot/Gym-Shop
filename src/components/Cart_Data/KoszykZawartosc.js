import Navbar from '../Navbar';
import CartList from '../CartList';
import { useState, useEffect } from 'react'
import { getCookie, setCookie } from "../../CookieFunction";
import { useAlert } from "react-alert";
import './cart.css';

const KoszykZawartosc = (props) => {

    const [blogs, setBlogs] = useState([]);
    const alert = useAlert();


    useEffect(() => {
        const sessionCookie = getCookie("SESSION-ID");
        fetch('http://localhost/getDataFromSession', {
            method: 'GET',
            headers: {
                'SESSIONID': sessionCookie,
                'Content-Type': 'application/json'
            },
        })
            .then(response => response.text())
            .catch(error => console.log('error', error))
            .then(result => {
                const correctedString = result.replace(/([a-zA-Z0-9_\s]+)\s*=/g, '"$1": ')
                    .replace(/(['"])?([a-zA-Z0-9_\s]+)(['"])?:/g, '"$2": ')
                    .replace(/'/g, '"');
                const json = JSON.parse(correctedString);
                const transformed = Object.entries(json.collections).map(([key, value]) => ({
                    title: value.title,
                    cena: value.cena,
                    author: value.author,
                    id: value.id,
                    photoName: value.photoName,
                    count: parseInt(value.count, 10)
                }));
                Promise.all(transformed.map(async (blog, index) => {
                    console.log(blog.photoName);
                    const photoResponse = await fetch('http://localhost/getPhoto', {
                      method: 'POST',
                      body: blog.photoName,
                      headers: {
                        'Content-Type': 'application/json'
                      }
                    });
                    const photoData = await photoResponse.blob();
                    const photoUrl = URL.createObjectURL(photoData);
                    return { ...blog, photo: photoUrl };
                  })).then(updatedBlogs => {
                    setBlogs(updatedBlogs);
                    setCookie("USER_CART", JSON.stringify(updatedBlogs), 1);
                    console.log(updatedBlogs);
                  });

                
            });

    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const handleExtendedBlog = (props) =>{
        setBlogs(props);
        setCookie("USER_CART", JSON.stringify(props), 1);

    }

    let totalCena = blogs.reduce((total, blog) => {
        let cena = typeof blog.cena === 'string' ? blog.cena : blog.cena.toString();
        return (total + parseFloat(cena.replace(' zł', '').replace(',', '.'))) * blog.count;
    }, 0).toFixed(2);
    
    let spendCena = 9.99;
    let result = (parseFloat(totalCena) + parseFloat(spendCena)).toFixed(2);

    return (
        <div>
            <Navbar />
            <div className='cartContent'>
                <div className='koszyk'>
                    <div>
                        <div className='koszykTitle'>
                            <h2>KOSZYK</h2>
                        </div>
                        <div className='list'>
                            <CartList blogs={blogs} handleBlogs={handleExtendedBlog} />
                        </div>
                    </div>
                </div>
                <div className='paying'>
                    <div className='payingMainDivPrice'>
                        <div className='payingDivPrice'>
                            <h2>{blogs.reduce((acc, curr) => parseInt(acc) +parseInt(curr.count), 0)} szt.</h2>
                            <h2> {totalCena} zł</h2>
                        </div>
                        <div className='payingDivPrice'>
                            <h2>Wysyłka</h2>
                            <h2> {spendCena} zł</h2>
                        </div>
                    </div>
                    <div className='payingDivPrice'>
                        <h2> Razem</h2>
                        <h2> {result} zł</h2>
                    </div>
                    {blogs.length === 0 
                        ?<button onClick={() => alert.error("Brak przedmiotów")}>Idź do kasy</button> 
                        : <button onClick={() => { props.initProducts(blogs, result, blogs.reduce((acc, curr) => parseInt(acc) +parseInt(curr.count), 0)); props.onFormSwitch('payment')}}>Idź do kasy</button> }

                </div>
            </div>
        </div>
    ); 
}
    

export default KoszykZawartosc;