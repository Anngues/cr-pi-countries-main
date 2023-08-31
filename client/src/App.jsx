import { Route, Routes } from 'react-router-dom'
import './App.css'
import Landing from './components/LandingPage/LandingPage';
import Home from './components/Home/Home';
// import Form from './components/Form/CreateActivity';
import DetailPage from './components/DetailPage/DetailPage'
import Form from './components/Form/Form';
import CreateActivity from './components/Form/CreateActivity';


export default function App() {

  return (
    <div>
      <Routes>
        <Route path='/' element={<Landing />} />
        <Route path='/Home' element={<Home />} />
        <Route path='/Form' element={<CreateActivity />} />
        <Route path='/forms' element={<Form/>} />
        <Route path='/detail/:id' element={<DetailPage />} />
      </Routes>
    </div>
  );
}