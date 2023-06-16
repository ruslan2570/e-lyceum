import './Styles/App.css';
import { Route, Routes } from 'react-router-dom';
import Welcome from './Pages/Welcome';
import ProblemsList from './Pages/ProblemsList';

function App() {

  return (
    <Routes>
      <Route path='/' element={<Welcome />} ></Route>
      <Route path='/problemsList' element={<ProblemsList/>} ></Route>
    </Routes>
  );
}

export default App;