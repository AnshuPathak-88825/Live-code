import './App.css';
import { BrowserRouter, Route,Routes} from 'react-router-dom';
import Home from './pages/Home';
import EditorPage from './pages/EditorPage';
function App() {
  return (
    <div className="App">
      <BrowserRouter>
      <Routes>
        <Route path='/' element={<Home/>} ></Route>
        <Route path='/Editor/:roomId' element={<EditorPage/>} ></Route>

      </Routes>
      </BrowserRouter>

    </div>
  );
}

export default App;
