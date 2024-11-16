import './App.css';
import React, { useState, useEffect } from 'react';





//{product.map((e) => Card({...e}))}
// function Card({name, brand, price, part, id, IMG}){
//   return(<div className="flex justify-center items-center w-screen" key={id} part={part}><h1>{brand}, {name}, {price} &nbsp;</h1><img src={IMG} className=""></img><button className="border-2 rounded" onClick={}>test</button></div>)
// }

function App() {
const productList = [ 
  {name:"REDS", brand:"Bones", price:18.95, part:"Bearings", id:"000"},
  {name:"GP-R", brand:"Independent", price:13.99, part:"Bearings", id:"001"},
  {name:"Cheapshot", brand:"Spitfire", price:9.99, part:"Bearings", id:"002"},
  {name:"SWISS", brand:"Bones", price:49.95, part:"Bearings", id:"003"},

  {name:"Yuto Cherry Blossom", brand:"Spitfire", price:45.99, part:"Wheels", id:"004"},
  {name:"Devide", brand:"Darkstar", price:25.95, part:"Wheels", id:"005"},
  {name:"Slicks", brand:"Dogtown", price:36.99, part:"Wheels", id:"006"},
  {name:"Omega", brand:"Bones", price:41.95, part:"Wheels", id:"007"},

  {name:"Downlow", brand:"Krux", price:24.99, part:"Trucks", id:"008"},
  {name:"Inverted Kingpin", brand:"Independent", price:30.95, part:"Trucks", id:"009"},
  {name:"Gilded Team", brand:"Thunder", price:34.99, part:"Trucks", id:"010"},
  {name:"ST1", brand:"Slappy", price:32.99, part:"Trucks", id:"011"}
]

const [cart, setCart] = useState([])//Trucks, Bearings
const [product, setProduct] = useState(productList)
const [partsChecklist, setPartsChecklist] = useState(["Trucks", "Wheels", "Bearings"])
const parts = ["Trucks", "Wheels", "Bearings"]

cart.forEach(
  (element) => { 
    if(partsChecklist.includes(element.part)){
    const newPartsChecklist = [...partsChecklist]; 
    newPartsChecklist.splice(partsChecklist.indexOf(element.part), 1);
    console.log(element.part)
    setPartsChecklist(newPartsChecklist);
    }
  }
)

  return (
    <>
    <div className="App">
      <div className="flex justify-center items-center w-screen">
        <h1 className="text-4xl">Sort by:</h1>
        <button className="border-2 rounded" onClick={() => {const productSorted = [...product]; productSorted.sort((a, b) => a.price - b.price); setProduct(productSorted) }}>Price</button>
        <button className="border-2 rounded" onClick={() => {const productSorted = [...product]; productSorted.sort((a, b) => a.brand.localeCompare(b.brand)); setProduct(productSorted) }}>Brand</button>
      <button className="border-2 rounded" onClick={() => {const productSorted = [...product]; productSorted.sort((a, b) => a.part.localeCompare(b.part)); setProduct(productSorted) }}>Part</button>
      </div>
      {product.map((product) => 
        <div className="flex justify-center items-center w-screen" key={product.id} part={product.part}>
          <h1>{product.part}, {product.brand}, {product.name}, {product.price} &nbsp;</h1>
          <img src={""} className=""></img>
          <button className="border-2 rounded" onClick={() => {setCart([...cart, product])}}>Add to cart</button>
        </div>)}
    </div>
    <div>
      <h1 className="flex justify-center items-center text-4xl">Cart</h1>
    {cart.map((product, id) => 
        <div className="flex justify-center items-center w-screen" key={id} part={product.part}>
          <h1>{product.part}, {product.brand}, {product.name}, {product.price} &nbsp;</h1>
          <img src={""} className=""></img>
          <button key={id} className="border-2 rounded" onClick={() => {const newCart = [...cart]; newCart.splice([[id]], 1);setCart(newCart);setPartsChecklist(["Trucks", "Wheels", "Bearings"])}}>Remove</button>
        </div>)}
        <h1 className="flex justify-center items-center text-4xl">Total:{cart.length > 0 ?  <p>{cart.reduce(function(a, b){return a + b.price}, 0)}</p> : 0}</h1>
        {cart.length > 0 && partsChecklist.length > 0 && <h1>Warning! Missing parts:{partsChecklist.join(", ")}</h1>}
    </div>
  </>
  );
}
export default App;