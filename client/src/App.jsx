
import { Route, Routes } from 'react-router-dom';
import './App.css'
import RegistrationForm from './Component/User/RegistertionForm'
import { GoogleOAuthProvider } from "@react-oauth/google";
import LoginForm from './Component/User/LoginForm';
import HomePage from './Component/HomePage';
import MyProfile from './Component/User/MyProfile';
import AddCase from './Component/Complains/AddCase';
import LatestCase from './Component/Complains/LatestCase';
import { useSelector } from 'react-redux';
import MyCases from './Component/User/MyCases';
import ListsOfComplains from './Component/ListsOfComplains';
import EmailVerification from './Component/EmailVerfication';
import MissingPersonProfile from './Component/MissingPersonProfile.jsx';
function App() {
  const {isLoggedIn}=useSelector((state)=>state.auth);
  const GOOGLE_CLIENT_ID = "YOUR_GOOGLE_CLIENT_ID.apps.googleusercontent.com";
  return (
    <Routes >

      <Route path=''  element={<HomePage/>}>
      <Route index element={<ListsOfComplains/>} />
      {/* <Route path=`missing-persons/${}` /> */}

      </Route>

      <Route path='/user/register' element={
         <GoogleOAuthProvider  clientId={GOOGLE_CLIENT_ID}>
         <RegistrationForm/>
      </GoogleOAuthProvider>
      }/>
      <Route path='/user/login' element={<LoginForm/>}/>
      
      {
        isLoggedIn &&
        <Route path='/my' element={<MyProfile/>}>
        <Route index  element={<LatestCase/>}/>
        <Route  path='addcase' element={<AddCase/>}/>
        <Route index path='main' element={<LatestCase/>}/>
        <Route index path='mycases' element={<MyCases/>}/>
        
        </Route>
      
      }
    
    <Route path='/user/verify/:userId/:uniqueString'  element={<EmailVerification/>}  />
    <Route path='/missing-person/:complainId' element={<MissingPersonProfile/>}/>

    <Route path='*' element={<LoginForm/>} />


     


    </Routes>
  )
}

export default App
