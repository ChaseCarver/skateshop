import './App.css';
import React, { useEffect, useState } from 'react';
import { Link, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Cart from "./pages/Cart";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {faCartShopping} from "@fortawesome/free-solid-svg-icons"
import {faHouse} from "@fortawesome/free-solid-svg-icons"
import Logo from "./Logo.png"
function App() {


function Navbar(){
  const [cartCount, setCartCount] = useState(0)
  useEffect(() => {
    const savedCart = JSON.parse(localStorage.getItem("cart"))
    if(savedCart){setCartCount(savedCart.length)}
    const handleStorageChange = () => {
      const updatedCart = JSON.parse(localStorage.getItem("cart"))
      if(updatedCart){setCartCount(updatedCart.length)}else{setCartCount(0)}
    }
    window.addEventListener("storage", handleStorageChange);
    return () => {window.removeEventListener("storage", handleStorageChange);};
    }, [])
  
  return(
  <div className=" p-2 flex flex-row w-screen justify-between sticky top-0 z-50 bg-slate-100 h-14">
    <Link to="/skateshop" className="flex justify-center items-center"><button className="hover:bg-slate-300 hover:rounded-xl "><FontAwesomeIcon icon={faHouse} className="text-3xl" /></button></Link>
    <Link to="/skateshop" className="flex justify-center items-center"><img src={Logo} className="h-full"></img></Link>
    <Link to="/skateshop/cart" className="flex justify-center items-center"><button className="hover:bg-slate-300 hover:rounded-xl"><p className="flex justify-center items-center absolute bg-red-500 rounded-full h-4 aspect-square top-1 right-1 text-sm font-bold text-white">{cartCount}</p><FontAwesomeIcon icon={faCartShopping} className="text-3xl" /></button></Link>
  </div>
  )
  }

  return (
    <>
        <Navbar/>
        <Routes>
          <Route path="/skateshop" element={<Home />} />
          <Route path="/skateshop/cart" element={<Cart />} />
        </Routes>
      
    </>
  );
}

export default App;