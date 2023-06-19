import { useState, useEffect } from 'react';

const GetSaleCodes = (props) => {
  const [kody, setKody] = useState([]);

  useEffect(() => {
    fetch("http://localhost/selectSaleCodes")
      .then((response) => response.json())
      .then((data) => {
        console.log(data.Kody);
        const json = data.Kody;
        const transformed = Object.entries(json).map(([key, value]) => ({
          id: value.id,
          kod: value.kod,
          rabat: value.rabat,
          dataWaznosci: value.dataWaznosci,
          czyUzyty: value.czyUzyty
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
              <h2>Kody Rabatowe</h2>
            </div>
            <div className='list'>
              <div className='CartPreview'>
                <table className='historyPreview'>
                  <thead className='tableHistory'>
                    <tr className='historyHead'>
                      <th>Kod</th>
                      <th>Wysokość Rabatu</th>
                      <th>Data Waznosci</th>
                      <th>Status</th>
                    </tr>
                  </thead>
                  <tbody className='tableHistory'>
                    {kody.map((blog, index) => {

                      return (
                        <tr key={index} className='bodyTr'>
                          <td>
                            {blog.kod}
                          </td>
                          <td>
                            {blog.rabat} %
                          </td>
                          <td>
                            {blog.dataWaznosci}
                          </td>
                          <td>
                            {blog.czySukces === 'T' ? "Zużyty" : "Nie Zużyty"}
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
      {/* {kody} */}
      <button onClick={() => props.setAction(0)}>Cofnij</button>
    </>
  );
};
export default GetSaleCodes;