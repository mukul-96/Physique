import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css';
import { Signin } from './pages/Signin';
import { Signup } from './pages/Signup';
import ManagerDashboard from './pages/ManagerPage';
import HeadPage from './pages/HeadPage';
import BranchPage from './pages/BranchPage';
import BranchAnalytics from './pages/BranchAnalytics';
import Qr from './pages/Qr';
import QrReader from './components/QrReader';
import Home from './pages/Home';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Signin />} />
        <Route path='/signup' element={<Signup />} />
        <Route path='/manager/:id' element={<ManagerDashboard />} />
        <Route path='/head' element={<HeadPage/>}></Route>
        <Route path='/head/branch/:id' element={<BranchPage/>}></Route>
        <Route path='/head/analytics/:branchId' element={<BranchAnalytics/>}></Route>
        <Route path='/user/:id' element={<Home/>}></Route>
        <Route path='/qr' element={<Qr/>}></Route>
        <Route path='qrreader/:id' element={<QrReader/>}></Route>

        
      </Routes>
    </BrowserRouter>
  );
}

export default App;
