import './App.css';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import SignupPage from './Pages/signup';
import LoginPage from './Pages/login';
import DashBoard from './Pages/dashboard';
import MapsViewWindow from './Components/Maps/Map';
import StaionDetailsSlots from './Components/StaionDetails';
import PaymentPage from './Components/Payment';
import PaymnetConfirmation from './Components/confirmation';
import PaymentCancelation from './Components/PaymentCancelation';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
          <Routes>
            {/* <Route exact path="/" element={<Mainpage />} /> */}
            {/* <Route exact path='/' element={<DashBoard/>}/> */}
            <Route exact path="/" element={<LoginPage/>} />
            <Route exact path="/User/Singup" element={<SignupPage/>} />
            <Route exact path='/Map' element={<MapsViewWindow/>}/>
            <Route exact path='/Map/:stationID' element={<StaionDetailsSlots/>}/>
            <Route exact path='/Payment' element={<PaymentPage/>}/>
            <Route exact path='/cart' element={<PaymentCancelation/>}/>
            <Route exact path='/checkout-success' element={<PaymnetConfirmation/>}/>
          </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
