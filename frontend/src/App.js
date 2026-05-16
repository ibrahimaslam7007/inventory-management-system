import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Login from './pages/Login';
import Register from './pages/Register';
import Products from './pages/Products';
import Dashboard from './pages/Dashboard';
import Home from './pages/Home';
import Navbar from './components/Navbar';
import Sales from './pages/Sales';

function App() {
  const userInfo = localStorage.getItem('userInfo');

  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/dashboard" element={userInfo ? <Dashboard /> : <Navigate to="/login" />} />
        <Route path="/products" element={userInfo ? <Products /> : <Navigate to="/login" />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/sales" element={userInfo ? <Sales /> : <Navigate to="/login" />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;