import './App.css';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import SignupPage from './Pages/signup';
import LoginPage from './Pages/login';
import DashBoard from './Pages/dashboard';
import MapsViewWindow from './Components/Maps/Map';
function App() {
  return (
    <div className="App">
      <BrowserRouter>
          <Routes>
            {/* <Route exact path="/" element={<Mainpage />} /> */}
            <Route exact path='/' element={<DashBoard/>}/>
            <Route exact path="/User/Singup" element={<SignupPage/>} />
            <Route exact path="/User/Login" element={<LoginPage/>} />
            <Route exact path='/Map' element={<MapsViewWindow/>}/>
          </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
