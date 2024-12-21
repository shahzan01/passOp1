import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import NavBar from './components/NavBar'
import Manager from './components/Manager'
import Footer from './components/Footer'
import Login from './components/Login'
import { BrowserRouter, Routes, Link, Route, Navigate } from 'react-router-dom'

function App() {
  return (
    <BrowserRouter>
      <>
        <Routes>
          <Route path="/" element={<Navigate to="/login" />} />
          <Route path="/dashboard"  element={isLogedIn()?<HomePage />:<Navigate to="/login"/>} />
          <Route path="/login" element={<Login />} />
        </Routes>
      </>
    </BrowserRouter>
  )
}
function isLogedIn(){
  const token=localStorage.getItem("token");

if(!token){
  return false;
}

return true;
}







function HomePage() {
  return (
    <div className="bg-[radial-gradient(60%_120%_at_50%_50%,hsla(0,0%,100%,0)_0,rgba(142,242,20,.2)_100%)] min-h-screen flex flex-col justify-between">
      <div className="p-0 m-0">
        <NavBar />
      </div>
      <div>
        <Manager />
      </div>
      <div>
        <Footer />
      </div>
    </div>
  )
}

export default App
