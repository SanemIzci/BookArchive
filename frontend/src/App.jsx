import { Routes, Route } from 'react-router-dom';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { fetchUserProfile } from '../redux/UserSlice';
import Home from '../pages/Home.jsx';
import Login from '../pages/Login.jsx';
import Layout from '../components/Layout.jsx';
import Register from '../pages/Register.jsx';
import ForgotPassword from '../pages/ForgotPassword.jsx';
import ResetPassword from '../pages/ResetPassword.jsx';
import Dashboard from '../pages/Dashboard.jsx';
import Details from '../pages/Details.jsx';
import Favorites from '../pages/Favorites.jsx';
function App() {
  const dispatch = useDispatch();

  // App başlatıldığında authentication kontrolü
  useEffect(() => {
    const token = localStorage.getItem('accessToken');
    if (token) {
      dispatch(fetchUserProfile());
    }
  }, [dispatch]); // isAuth dependency'sini kaldırdım

  return (
    <Routes>
       <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="login" element={<Login />} />
          <Route path="register" element={<Register/>}/>
          <Route path="forgotPassword" element={<ForgotPassword/>}/>
          <Route path="resetPassword" element={<ResetPassword/>}/>
          <Route path="dashboard" element={<Dashboard/>}/>
          <Route path="books/:id" element={<Details/>}/>
          <Route path="favorites" element={<Favorites/>}/>
        </Route>
    </Routes>
  );
}

export default App;