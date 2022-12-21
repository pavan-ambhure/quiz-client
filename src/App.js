import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css';
import Layout from './components/layout/Layout';
import Login from './components/login/Login';
import Quiz from './components/question/Quiz';
import Result from './components/result/Result';
import Authenticate from './components/Authenticate';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Login />} />
        {/* <Route element={<Authenticate />}> */}
        <Route path='/' element={<Layout />}>
          <Route path='/quiz' element={<Quiz />} />
          <Route path='/result' element={<Result />} />
        </Route>
        {/* </Route> */}
      </Routes>
    </BrowserRouter>
  );
}

export default App;
