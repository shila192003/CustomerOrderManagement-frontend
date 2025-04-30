import logo from './logo.svg';
import './App.css';
import Home from './components/Home';
import { BrowserRouter as Router, Route, Switch, Routes, BrowserRouter } from 'react-router-dom';
import About from './components/About';
import Contact from './components/Contact';
import Login from './components/Login';
import AdminDashBoard from './components/AdminDashBoard';

import AdminProductList from './components/AdminCustomerList';
import AdminCustomerList from './components/AdminCustomerList';
import AddCustomerOrder from './components/AddCustomerOrder';
import DeleteCustomerOrder from './components/DeleteCustomerOrder';
import UpdateCustomerOrder from './components/UpdateCustomerOrder';

function App() {
  return (
    <>
    <BrowserRouter>
       
      <div className="container-fluid1">
        <Routes>
          {/* Home route */}
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
        
          <Route path="/login"  element={<Login />} />
          <Route path="/admin-dashboard" element={<AdminDashBoard />} />
          <Route path="/p" element={<AdminCustomerList />} />
          <Route path="/addcustomerorder" element={<AddCustomerOrder />} />
          <Route path="/deletecustomerorder" element={<DeleteCustomerOrder />} />
          <Route path="/updatecustomerorder" element={<UpdateCustomerOrder />} />
        </Routes>
      </div>
    
    </BrowserRouter>

    
</>
  );

}

export default App;
