import { Routes, Route } from 'react-router-dom';
import Home from '../pages/Home.jsx';
import Login from '../pages/Login.jsx';
import Layout from '../components/Layout.jsx';
import Register from '../pages/Register.jsx';
import ForgotPassword from '../pages/ForgotPassword.jsx';
import ResetPassword from '../pages/ResetPassword.jsx';
import Dashboard from '../pages/Dashboard.jsx';

function App() {
  return (
    <Routes>
       <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="login" element={<Login />} />
          <Route path="register" element={<Register/>}/>
          <Route path="forgotPassword" element={<ForgotPassword/>}/>
          <Route path="resetPassword" element={<ResetPassword/>}/>
          <Route path="dashboard" element={<Dashboard/>}/>
        </Route>
    </Routes>
  );
}

export default App;