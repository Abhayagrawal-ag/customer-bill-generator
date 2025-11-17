import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import {BrowserRouter, Routes, Route} from 'react-router-dom'
import Signup from './components/Signup';
import EmailVerify from './components/emailVerify'
import Login from './components/Login'
import PasswordResetRequest from './components/PasswordResetRequest'
import PasswordChange from './components/PasswordChange'
import ProductLists from './components/ProductsList'
import ShopDetails from './components/ShopDetails'
import CustomerDetails from './components/CustomerDetails'
import PdfGenerate from './components/PdfGenerate'
function App() {
  return (
    <BrowserRouter>
     <Routes>
       <Route path="/" element={<Signup/>} />
       <Route path="emailverify" element={<EmailVerify/>}/>
       <Route path="login" element={<Login/>}/>
       <Route path="passwordresetrequest" element={<PasswordResetRequest/>}/>
       <Route path="passwordchange" element={<PasswordChange/>}/>
        <Route path="listofproducts" element={<ProductLists/>}/>
        <Route path="shopdetails" element={<ShopDetails/>}/>
         <Route path="customerdetails" element={<CustomerDetails/>}/>
         <Route path="pdfgenerate" element={<PdfGenerate/>}/>
     </Routes>
    </BrowserRouter>
  )
}
export default App
