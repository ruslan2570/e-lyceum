import './Styles/App.css';
import { Route, Routes } from 'react-router-dom';
import Welcome from './Pages/Welcome';
import TopicsList from './Pages/TopicsList';

function App() {

  return (
    <Routes>
      <Route path='/' element={<Welcome />} ></Route>
      <Route path='/topicsList' element={<TopicsList/>} ></Route>
    </Routes>
  );
}

export default App;