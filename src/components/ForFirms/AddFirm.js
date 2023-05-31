import { useState, useEffect } from 'react';

const AddFirm = (props) => {
    const [firmName, setFirmName] = useState("");
    const [telefon, setTelefon] = useState("");
    const [hasFirm, setHasFirm] = useState(0);

    useEffect(() => {
        console.log(props.user);
        fetch("http://localhost/selectUserFirm/"+props.user.id)
        .then((response) => response.json())
        .then((data) => {
            console.log(data);
            if (data.Status === 'success') {
                setFirmName(data.Firmy[0].nazwa);
                setTelefon(data.Firmy[0].telefon);
                data.Firmy[0].nazwa!==""?setHasFirm(1):setHasFirm(0);
            } else {
                alert("Błąd");
            }
        });
      }, [props]);

    const handleSubmit = (e) =>{
        fetch("http://localhost/insertUserFirm/"+props.user.id+"/"+firmName+"/"+telefon)
        .then((response) => response.json())
        .then((data) => {
            console.log(data);
            if (data.Status === 'success') {
                alert("Dodano firmę");
                setHasFirm(1);
            } else {
                alert("Błąd");
            }
        })
        e.preventDefault();

    }
    return (
    <>
        <h2>Firma przypisana do konta</h2>
         <form onSubmit={handleSubmit}>
          <label htmlFor="nazwa">Nazwa</label>
          <input
            group="text"
            placeholder="Nazwa firmy"
            id="nazwa"
            name="nazwa"
            value={firmName}
            onChange={(e) => setFirmName(e.target.value)}
            required
            disabled={hasFirm === 1 ? true : false}
          />
          <br />
          <label htmlFor='telefon'>Telefon</label>
            <input  value ={telefon} onChange = {(e) => {const input = e.target.value;
                                    if (/^\d{0,9}$/.test(input)) setTelefon(input)
                                    }}
                type="text" placeholder="telefon" id='telefon' name='telefon'  minLength="9"  maxLength="9" pattern="\d+" required
                disabled={hasFirm === 1 ? true : false}
            />
            {hasFirm === 0&&(
                <button group="submit">Zatwierdź</button>
            )}
          <button onClick={() => props.setAction(0)}>Cofnij</button>
        </form>
    </>
    );
  };
  export default AddFirm;