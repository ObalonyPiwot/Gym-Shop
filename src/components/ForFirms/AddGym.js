import { useState, useEffect } from 'react';

const AddGym = (props) => {
    const [firmID, setFirmID] = useState("");
    const [gymName, setgGymName] = useState("");
    const [adress, setAdress] = useState("");
    const [telefon, setTelefon] = useState("");
    const [hasFirm, setHasFirm] = useState(0);
    const [gyms, setGyms] = useState(0);
    useEffect(() => {
        fetch("http://localhost/selectUserFirm/"+props.user.id)
        .then((response) => response.json())
        .then((data) => {
            console.log(data);
            if (data.Status === 'success') {
                firmIDSetter(data.Firmy[0].id);
                data.Firmy[0].id?setHasFirm(1):setHasFirm(0);           
            } else {
                alert("Błąd");
            }
            
        });
        
        }, [props]); 

        function firmIDSetter(value){
            setFirmID(value)
            if(value!==0)
                fetch("http://localhost/selectUserGyms/"+value)
                .then((response) => response.json())
                .then((data) => {
                    setGyms(data.Silownie.map((silownia) => (
                        <div key={silownia.id}>
                        <h3>Nazwa: {silownia.nazwa}</h3>
                        <p>Adres: {silownia.adres} Telefon: {silownia.telefon}</p>
                        </div>     
                )));
                });
        }

    const handleSubmit = (e) =>{
        fetch("http://localhost/insertUserGym/"+firmID+"/"+gymName+"/"+adress+"/"+telefon)
        .then((response) => response.json())
        .then((data) => {
            console.log(data);
            if (data.Status === 'success') {
                alert("Dodano siłownię");
                if(hasFirm)
                fetch("http://localhost/selectUserGyms/"+firmID)
                .then((response) => response.json())
                .then((data) => {
                    setGyms(data.Silownie.map((silownia) => (
                    <div key={silownia.id}>
                    <h3>Nazwa: {silownia.nazwa}</h3>
                    <p>Adres: {silownia.adres} Telefon: {silownia.telefon}</p>
                    </div>     
                )));
                });
            } else {
                alert("Błąd");
            }
        })
        e.preventDefault();

    }
    return (
    <>
        <h2>Dodaj siłownię do firmy</h2>
         {hasFirm === 1 &&(
            <form onSubmit={handleSubmit}>
            <label htmlFor="nazwa">Nazwa</label>
            <input
                group="text"
                placeholder="Nazwa siłowni"
                id="nazwa"
                name="nazwa"
                value={gymName}
                onChange={(e) => setgGymName(e.target.value)}
                required
            />
            <br />
            <label htmlFor="nazwa">Adres</label>
            <input
                group="text"
                placeholder="Adres siłowni"
                id="adres"
                name="adres"
                value={adress}
                onChange={(e) => setAdress(e.target.value)}
                required
            />
            <br />
            <label htmlFor='telefon'>Telefon</label>
                <input  value ={telefon} onChange = {(e) => {const input = e.target.value;
                                        if (/^\d{0,9}$/.test(input)) setTelefon(input)
                                        }}
                    type="text" placeholder="telefon" id='telefon' name='telefon'  minLength="9"  maxLength="9" pattern="\d+" required
                />
                    <button group="submit">Zatwierdź</button>
            </form>
            )}
            <br/>
            <h2>Moje siłownie</h2>
            {gyms}
            <button onClick={() => props.setAction(0)}>Cofnij</button>
    </>
    );
  };
  export default AddGym;