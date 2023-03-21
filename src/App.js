
import Navbar from './components/Navbar';
import Konto from './pages/Konto';
import Sidebar from './components/Sidebar';


function App() {

  return (
    <div className="App">
      <Sidebar/>
      <Navbar/>
      <div className="content">
        <Konto/>
      </div>
    </div>
  );
}

export default App;
