import React, { useState, useEffect } from 'react';
import ProductList from './productList.js';

import { Link } from "react-router-dom";

//TODO
//make product list immutable
//whole price doesnt have decimal
//instead of home icon on left, dropdown for seperate part pages ("shop by: decks, grip tape, etc.")
//turn sort by into a dropdown
//add a quantity upon add item
//add contact us footer (contact us, pricacy policy, returns)
//add email list
//add "your cart is empty"
//add checkout button to cart
//home page doesnt load on page load??

function Home(){
    const [cart, setCart] = useState([])
    const [product, setProduct] = useState(ProductList)

     useEffect(() => {
        const value = JSON.parse(localStorage.getItem("cart"))
        if(value){setCart(value)}
     }, [])

    function Sort(){
        return(
            <div className="flex justify-center items-center">
                <h1 className="font-bold">Sort by: &nbsp;</h1>
                <button className="border-2 rounded px-1" onClick={() => {const productSorted = [...product]; productSorted.sort((a, b) => a.price - b.price); setProduct(productSorted) }}>Price</button>
                &nbsp;<button className="border-2 rounded px-1" onClick={() => {const productSorted = [...product]; productSorted.sort((a, b) => a.brand.localeCompare(b.brand)); setProduct(productSorted) }}>Brand</button>
                &nbsp;<button className="border-2 rounded px-1" onClick={() => {const productSorted = [...product]; productSorted.sort((a, b) => a.part.localeCompare(b.part)); setProduct(productSorted) }}>Part</button>
            </div>
            )
    }

    function handleAddCart(product){
        console.log([...cart, product])
        
        localStorage.setItem("cart", JSON.stringify([...cart, product]) )
        setCart([...cart, product])
        const event = new Event("storage");  // Trigger the 'storage' event
        window.dispatchEvent(event);
    }
//{localStorage.setItem("cart", JSON.parse([...cart], product)); setCart([...cart, product])}
    function Card(){
    const card = product.map((product) => 
        <div className="flex flex-col justify-center items-center my-10" key={product.id} part={product.part}>
            <div className="flex justify-center items-center w-10/12 aspect-square border-2 rounded-md drop-shadow-md overflow-hidden">
            <img src={product.IMG} className="object-contain "></img>
            </div>
            <h1 className="font-bold p-1">{product.part}, {product.brand}, {product.name}, ${product.price} &nbsp;</h1>
        <button className="border-2 rounded" onClick={() => handleAddCart(product)}>Add to cart</button>
        </div>)
    return(card)
    }

    // function Cart(){
    // cart.forEach((element) => { 
    //     if(partsChecklist.includes(element.part)){
    //     const newPartsChecklist = [...partsChecklist]; 
    //     newPartsChecklist.splice(partsChecklist.indexOf(element.part), 1);
    //     console.log(element.part)
    //     setPartsChecklist(newPartsChecklist)}
    // })
    // return(
    // <>
    //     <h1 className="flex justify-center items-center text-4xl">Cart</h1>
    //     {cart.map((product, id) => 
    //     <div className="flex justify-center items-center w-screen" key={id} part={product.part}>
    //         <h1>{product.part}, {product.brand}, {product.name}, {product.price} &nbsp;</h1>
    //         <img src={""} className=""></img>
    //         {/* <button key={id} className="border-2 rounded" onClick={() => {const newCart = [...cart]; newCart.splice([[id]], 1);setCart(newCart);setPartsChecklist(parts)}}>Remove</button> */}
    //     </div>)}
    //     <h1 className="flex justify-center items-center text-4xl">Total:{cart.length > 0 ?  <p>{ (Math.floor((cart.reduce(function(a, b){return a + b.price}, 0))*100)/100).toFixed(2)}</p> : 0}</h1>
    //     {cart.length > 0 && partsChecklist.length > 0 && <h1>Warning! Missing parts:{partsChecklist.join(", ")}</h1>}
    // </>
    // )
    // }
    return(
        <>
        <Sort/>
      <Card/>
      {/* <Cart/> */}
        </>
    )
}
export default Home