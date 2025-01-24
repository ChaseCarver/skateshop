import React, { useEffect, useState } from 'react';
import ProductList from './productList.js';
//needed info: products added to cart

localStorage.setItem("lastname", "Smith")
localStorage.getItem("lastname");

function Cart(){
    const [partsChecklist, setPartsChecklist] = useState([])
    const [cart, setCart] = useState([])
    useEffect(()=> {
        const partsList = []
        ProductList.forEach((a) => {if(!partsList.includes(a.part)){partsList.push(a.part)}})
        setPartsChecklist(partsList)
        }, [])
    useEffect(() => {
        const value = JSON.parse(localStorage.getItem("cart"))
        if(value){setCart(value)}
    }, [])
    cart.forEach((element) => { 
        if(partsChecklist.includes(element.part)){
        const newPartsChecklist = [...partsChecklist]; 
        newPartsChecklist.splice(partsChecklist.indexOf(element.part), 1);
        console.log(element.part)
        setPartsChecklist(newPartsChecklist)}
    })
    console.log(cart)
    return(
    <>
        <h1 className="flex justify-center items-center text-4xl">Cart</h1>
        {(cart.length) == 0 ? <p>Cart is empty, start shopping!</p>:
        cart.map((product, id) => 
        <div className="flex justify-center items-center w-screen" key={id} part={product.part}>
            <h1>{product.part}, {product.brand}, {product.name}, {product.price} &nbsp;</h1>
            <img src={""} className=""></img>
            <button key={id} className="border-2 rounded" onClick={() => {const newCart = [...cart]; newCart.splice([[id]], 1);setCart(newCart);localStorage.setItem("cart", JSON.stringify([...newCart]) );const event = new Event("storage");  // Trigger the 'storage' event
    window.dispatchEvent(event);}}>Remove</button>
        </div>)}
        
        <h1 className="flex justify-center items-center text-4xl">Total:{cart.length > 0 ?  <p>{ (Math.floor((cart.reduce(function(a, b){return a + b.price}, 0))*100)/100).toFixed(2)}</p> : 0}</h1>
        {cart.length > 0 && partsChecklist.length > 0 && <h1 className="flex justify-center items-center text-red-500">Warning! Missing parts:{partsChecklist.join(", ")}</h1>}
    
    </>)
}

export default Cart
// setPartsChecklist(parts)