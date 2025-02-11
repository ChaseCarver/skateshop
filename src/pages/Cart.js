import React, { useEffect, useState } from 'react';
import ProductList from './productList.js';
//needed info: products added to cart

function Cart(){
    const [partsChecklist, setPartsChecklist] = useState([])
    const [cart, setCart] = useState([])

    useEffect(()=> {
        const value = JSON.parse(localStorage.getItem("cart"))
        if(value){setCart(value)} 
        const partsList = []
        ProductList.forEach((a) => {if(!partsList.includes(a.part)){partsList.push(a.part)}})
        setPartsChecklist(partsList)
        console.log("useeffect triggered")
        }, [])

    function updatePartsCheckList(updatedCart){
        const updatedPartsChecklist = partsChecklist.filter(part =>
            !updatedCart.some(product => product.part === part));
        return(updatedPartsChecklist)
        }

    function handleRemove(id){
        const newCart = [...cart]
        newCart.splice(id, 1)
        setCart(newCart)
        localStorage.setItem("cart", JSON.stringify([...newCart]) )
        const event = new Event("storage")
        window.dispatchEvent(event)
    }

    return(
    <>
        <h1 className="flex justify-center items-center text-4xl">Cart</h1>
        {(cart.length) == 0 ? <p>Cart is empty, start shopping!</p>: 
        cart.map((product, id) => 
        <div className="flex justify-center items-center w-screen p-2" key={id} part={product.part}>
            <div className="border-2 rounded-md md:w-1/2 flex">
            <div className="flex justify-center items-center w-3/12 aspect-square border-2 rounded-md drop-shadow-md overflow-hidden">
                <img src={product.IMG} className="object-contain"></img>
            </div>
            <div className="flex flex-col w-full">
                <div className="flex justify-between">
                    <h1>{product.brand}, {product.name}</h1>
                    <button key={id} className="border-2 rounded" onClick={() => handleRemove(id)}>X</button>
                </div>
                <div className="flex justify-between">
                    <h1 className="text-slate-300">{product.part}</h1>
                    <h1>${product.price}</h1>
                </div>
            </div>
            </div>
        </div>)}
        <h1 className="flex justify-center items-center text-4xl">Total:{cart.length > 0 ?  <p>${ (Math.floor((cart.reduce(function(a, b){return a + b.price}, 0))*100)/100).toFixed(2)}</p> : 0}</h1>
        {cart.length > 0 && <p>Warning! Missing parts: {updatePartsCheckList(cart).join(", ")}</p>}
    </>)
}
export default Cart