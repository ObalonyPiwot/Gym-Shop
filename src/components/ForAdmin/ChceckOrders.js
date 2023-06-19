import { useState, useEffect } from 'react';

const ChceckOrders = (props) => {
    const [kody, setKody] = useState([]);

    useEffect(() => {
      fetch("http://localhost/ChceckOrders")
        .then((response) => response.json())
        .then((data) => {
          console.log(data.Umowy);
          const json = data.Umowy;
          const transformed = Object.entries(json).map(([key, value]) => ({
            nazwa: value.nazwa,
            dataZawarcia: value.dataZawarcia,
            dataZakonczenia: value.dataZakonczenia,
            opis: value.opis,
            cena: value.cena
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
                <h2>Umowy</h2>
              </div>
              <div className='list'>
                <div className='CartPreview'>
                  <table className='historyPreview'>
                    <thead className='tableHistory'>
                      <tr className='historyHead'>
                        <th>Silownia</th>
                        <th>Data Zawarcia</th>
                        <th>Data Zakonczenia</th>
                        <th>Opis</th>
                        <th>cena</th>
                      </tr>
                    </thead>
                    <tbody className='tableHistory'>
                      {kody.map((blog, index) => {
  
                        return (
                          <tr key={index} className='bodyTr'>
                            <td>
                              {blog.nazwa}
                            </td>
                            <td>
                              {blog.dataZawarcia}
                            </td>
                            <td>
                              {blog.dataZakonczenia}
                            </td>
                            <td>
                              {blog.opis}
                            </td>
                            <td>
                              {blog.cena}
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
  export default ChceckOrders;