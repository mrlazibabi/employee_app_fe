
import './App.css';
import { Home } from './components/Home';
import { Department } from './components/Department';
import { Employee } from './components/Employee';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { Navigation } from './components/Navigation';

function App() {
  return (
    <BrowserRouter>
        <div className="container">
<h3 className='m-3 d-flex justify-content-center'>
  React JS with Web API Demo
  </h3>
  <h5 className='m-3 d-flex justify-content-center'>
    Employee Management Portal
  </h5>

  <Navigation/>


<Routes>
  <Route path='/' Component={Home} exact/>
  <Route path='/department' Component={Department}/>
  <Route path='/employee' Component={Employee}/>
</Routes>
</div>
</BrowserRouter>

  );
}

export default App;
