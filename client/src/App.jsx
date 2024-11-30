
import { Route, Routes } from 'react-router-dom';
import './App.css'
import RegistrationForm from './Component/User/RegistertionForm'
import { GoogleOAuthProvider } from "@react-oauth/google";
import LoginForm from './Component/User/LoginForm';
function App() {
  const GOOGLE_CLIENT_ID = "YOUR_GOOGLE_CLIENT_ID.apps.googleusercontent.com";
  return (
    <Routes >
      <Route path='/user/register' element={
         <GoogleOAuthProvider  clientId={GOOGLE_CLIENT_ID}>
         <RegistrationForm/>
      </GoogleOAuthProvider>
      }/>
      <Route path='/user/login' element={<LoginForm/>}/>


     


    </Routes>
  )
}

export default App
