import Konto from './pages/Konto';
import { Route, Routes } from 'react-router-dom';
import Home from './pages/Home'
import Koszyk from './pages/Koszyk'
import Promocje from './pages/Promocje'
import Nowosci from './pages/Nowosci'
import Favourite from './pages/Ulubione';


function App() {

  return (
    <div className="App">
      <Routes>
        <Route exact path='/' Component={Home}/>
        <Route path='/Konto' Component={Konto}/>
        <Route path='/Koszyk' Component={Koszyk}/>
        <Route path='/Promocje' Component={Promocje}/>
        <Route path='/Nowosci' Component={Nowosci}/>
        <Route path='/Ulubione' Component={Favourite}/>
      </Routes>
    </div>
  );
}



export default App;
