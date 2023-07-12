import './Styles/App.css';
import { Route, Routes } from 'react-router-dom';
import Welcome from './Pages/Welcome';
import TopicsList from './Pages/TopicsList';
import Send from './Pages/Send';
import Consolusion from './Pages/Conclusion';
import Login from './Pages/Login';
import Admin from './Pages/Admin';
import Main from './Pages/Admin/Main';
import Topics from './Pages/Admin/Topics';
import Teachers from './Pages/Admin/Teachers';
import Funcs from './Pages/Admin/Funcs';

function App() {
  return (
    <Routes>
      <Route path='/' element={<Welcome />} ></Route>
      <Route path='/topicsList' element={<TopicsList />} ></Route>
      <Route path='/send' element={<Send />} ></Route>
      <Route path='/conclusion' element={<Consolusion />} ></Route>
      <Route path='/login' element={<Login />} ></Route>
      <Route path='/admin/*' element={<Admin />}>
        <Route path="" element={<Main />}></Route>
        <Route path="topics" element={<Topics />}></Route>
        <Route path="teachers" element={<Teachers />}></Route>
        <Route path="funcs" element={<Funcs />}></Route>
      </Route>
    </Routes>
  );
}

export default App;