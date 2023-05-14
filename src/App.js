import Konto from './pages/Konto';
import { Route, Routes } from 'react-router-dom';
import Home from './pages/Home'
import Koszyk from './pages/Koszyk'
import Promocje from './pages/Promocje'
import Nowosci from './pages/Nowosci'
import { useEffect } from 'react';


function App() {

  useEffect(() => {
    /*const sessionCookie = getCookie("SESSION-ID");
    if (sessionCookie) {
      setSessionId(sessionCookie);
      console.log(sessionCookie);
      console.log("ISTNIEJE");
    } else {
      console.log("WYKONANO");
      // Jeśli nie ma ciasteczka z identyfikatorem sesji, wykonaj żądanie do serwera
      fetch("http://localhost/api/getSessionID")
        .then((response) => response.text())
        .then((data) => {
          setSessionId(data);
          setCookie("SESSION-ID", data, 1); // Zapisz identyfikator sesji w ciasteczku
        });
    }*/
  }, []);

  return (
    <div className="App">
      <Routes>
        <Route exact path='/' Component={Home}/>
        <Route path='/Konto' Component={Konto}/>
        <Route path='/Koszyk' Component={Koszyk}/>
        <Route path='/Promocje' Component={Promocje}/>
        <Route path='/Nowosci' Component={Nowosci}/>
      </Routes>
    </div>
  );
}



export default App;
