import {Routes, Route, BrowserRouter} from 'react-router-dom';
import { useState, createContext } from 'react';
import Home from './components/Home';
import RegistrationForm from './components/RegistrationForm';
import LoginForm from './components/LoginForm';
import Footer from './components/Footer';
import Users from './components/Users';
import Map from './components/Map';
import Messages from './components/Messages';
import Profile from './components/Profile';
import {Auth} from './auth/Auth';

export const AppContext = createContext(null)

function App() {
  const [token, setToken] = useState('')

  return (

    <BrowserRouter>
      <AppContext.Provider value={{token, setToken}}>
      <div className="App">
        <Routes>
          <Route path='/' element={<Home/>}/>
          <Route path='/login' element={<LoginForm/>}/>
          <Route path='/register' element={<RegistrationForm/>}/>
          <Route path='/profile' element={<Auth><Profile /></Auth>}/>
          <Route path='/users' element={<Users/>}/>
          <Route path='/map' element={<Auth><Map/></Auth>}/>
          <Route path='/messages' element={<Auth><Messages/></Auth>}/>
        </Routes>
        <Footer/>
      </div>
      </AppContext.Provider>
    </BrowserRouter>
  );
}

export default App;
