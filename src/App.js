import './Styles/App.css';
import { Route, Routes } from 'react-router-dom';
import Welcome from './Pages/Welcome';
import TopicsList from './Pages/TopicsList';
import Send from './Pages/Send';
import Consolusion from './Pages/Conclusion';
import Login from './Pages/Login';
import Admin from './Pages/Admin';


function App() {
  return (
    <Routes>
      <Route path='/' element={<Welcome />} ></Route>
      <Route path='/topicsList' element={<TopicsList />} ></Route>
      <Route path='/send' element={<Send />} ></Route>
      <Route path='/conclusion' element={<Consolusion />} ></Route>
      <Route path='/login' element={<Login />} ></Route>
      <Route path='/admin/*' element={<Admin />}>
        <Route path="" element={<p>Главная</p>}></Route>
        <Route path="topics" element={<p>Темы</p>}></Route>
        <Route path="teachers" element={<p>Учителя</p>}></Route>
        <Route path="funcs" element={<p>Фунции</p>}></Route>
      </Route>
    </Routes>
  );
}

export default App;