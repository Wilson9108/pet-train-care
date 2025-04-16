import { useState } from 'react'

import {BrowserRouter,Routes,Route, Router} from 'react-router-dom'
import './App.css'
import HomePage from './components/Homepage'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import Signup from './components/Signup'
import Signin from './components/Signin'
import RouterError from './components/RouterError'
import AdminSignin from './components/AdminSignin'
import AdminSignup from './components/AdminSignup'
import MyProfile from './components/MyProfile'
import TrainingRequest from './components/TrainingRequest'
import TrainingData from './components/TrainingData'
import TrainingAmount from './components/TrainingAmount'
import AdminProfile from './components/AdminProfile'
import TrainingResponse from './components/TrainingResponse'
import PetDaysCareRequest from './components/PetDaysCareRequest'
import PetsDaysCareData from './components/PetsDaysCareData'
import PetDaysCareAmount from './components/PetDaysCareAmount'
import PetDaysCareResponse from './components/PetDaysCareResponse'
import PetCareUserAccept from './components/PetCareUserAccept'
import TrainingCareUserAccept from './components/TrainingUserAccept'
import UserPlacedTrainingData from './components/UserPlacedTrainingData'
import UserPlacedPetCareData from './components/UserPlacedPetCareData'

function App() {
  return (
    <>
    <BrowserRouter>
    <Navbar/>
    <Routes>
      <Route path="/" element={<HomePage/>}></Route>
      <Route path="/signup" element={<Signup/>}></Route>
      <Route path="/signin" element={<Signin/>}></Route>
      <Route path='/adminsignin' element={<AdminSignin/>}></Route>
      <Route path='/adminsignup' element={<AdminSignup/>}></Route>
      <Route path='/adminprofile' element={<AdminProfile/>}></Route>
      <Route path='/profile' element={<MyProfile/>}></Route>
      <Route path='/training' element={<TrainingRequest/>}></Route>
      <Route path='/trainingData' element={<TrainingData/>}></Route>
      <Route path='/trainingamount' element={<TrainingAmount/>}></Route>
      <Route path="/trainingresponse" element={<TrainingResponse/>}></Route>
      <Route path='/petcarerequest' element={<PetDaysCareRequest/>}></Route>
      <Route path='/petcaredata' element={<PetsDaysCareData/>}></Route>
      <Route path='/petcareamount' element={<PetDaysCareAmount/>}></Route>
      <Route path='/petcareresponse' element={<PetDaysCareResponse/>}></Route>
      <Route path="/petcareuseraccept" element={<PetCareUserAccept/>}></Route>
      <Route path="/traininguseraccept" element={<TrainingCareUserAccept/>}></Route>
      <Route path='/trainingplaceddata' element={<UserPlacedTrainingData/>}></Route>
      <Route path='/petcareplaceddata' element={<UserPlacedPetCareData/>}></Route>

      <Route path="*" element={<RouterError/>}></Route>
    </Routes>
    <Footer/>
    </BrowserRouter>

    </>
  )
}

export default App
