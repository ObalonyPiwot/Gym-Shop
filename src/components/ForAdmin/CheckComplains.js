import { useState, useEffect } from 'react';

const CheckComplains = (props) => {
    const [kody, setKody] = useState([]);

    useEffect(() => {
      fetch("http://localhost/CheckComplains")
        .then((response) => response.json())
        .then((data) => {
          console.log(data.Reklamacje);
          const json = data.Reklamacje;
          const transformed = Object.entries(json).map(([key, value]) => ({
            id: value.id,
            data: value.data,
            opis: value.opis,
            idUzytkownik: value.idUzytkownik,
            idProdukt: value.idProdukt
          }));
          setKody(transformed);
        })
    }, []);
  
    return (
      <>
        <div className='cartContent'>
          <div className='koszyk'>
            <div>
              <div className='koszykTitle'>
                <h2>Reklamacje</h2>
              </div>
              <div className='list'>
                <div className='CartPreview'>
                  <table className='historyPreview'>
                    <thead className='tableHistory'>
                      <tr className='historyHead'>
                        <th>ID</th>
                        <th>Uzytkownik</th>
                        <th>Produkt</th>
                        <th>Opis</th>
                        <th>Data</th>
                      </tr>
                    </thead>
                    <tbody className='tableHistory'>
                      {kody.map((blog, index) => {
  
                        return (
                          <tr key={index} className='bodyTr'>
                            <td>
                              {blog.id}
                            </td>
                            <td>
                              {blog.idUzytkownik}
                            </td>
                            <td>
                              {blog.idProdukt}
                            </td>
                            <td>
                              {blog.opis}
                            </td>
                            <td>
                              {blog.data}
                            </td>
                          </tr>
                        )
                      })}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        </div>
        <button onClick={() => props.setAction(0)}>Cofnij</button>
      </>
    );
  };
  export default CheckComplains;