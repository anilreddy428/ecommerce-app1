import './App.css';
import SignUp from './components/signup';
import LogIn from './components/login';
import ProductFeed from './components/productfeed';
import { ToastContainer} from 'react-toastify';
import {
  BrowserRouter,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";

//login for protected routes
  const ProtectedRoute =(props) =>{ 
  const token = localStorage.getItem("EcommerAuthToken");
  const hasLoggedIn = token !== "";
  if(hasLoggedIn) return props.children;
  return <Navigate to="/login"/>
}
//login for unprotected routes
const UnProtectedRoute =(props) =>{ 
  const token = localStorage.getItem("EcommerAuthToken");
  const hasLoggedIn = token !== "";
  if (hasLoggedIn) return props.children;
  return <Navigate to="/Productfeed" />
 }
function App() { 
  return (
    <div className="App">
    <ToastContainer 
     position="top-right"
     autoClose={5000}
     hideProgressBar={false}
     newestOnTop={false}
     closeOnClick
     rtl={false}
     pauseOnFocusLoss
     draggable
     pauseOnHover
    />
    <BrowserRouter>
    <Routes>
      <Route path="/productfeed" element={
        <ProtectedRoute>
          <ProductFeed />
        </ProtectedRoute>
      }/>
      <Route path="/login" element={
        <UnProtectedRoute>
          <LogIn/>
          </UnProtectedRoute>
      }/>
      <Route path="/signup" element={
        <UnProtectedRoute>
          <SignUp />
        </UnProtectedRoute>
      }/>
      <Route path="/referal/:referalid" element={<SignUp />}/>
    </Routes>
  </BrowserRouter>
    </div>
  );
}

export default App;
