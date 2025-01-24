import React, { useState, useEffect } from 'react';
import ProductList from './productList.js';

import { Link } from "react-router-dom";

//TODO
//instead of home icon on left, dropdown for seperate part pages ("shop by: decks, grip tape, etc.")
//add a quantity upon add item
//add contact us footer (contact us, pricacy policy, returns)
//add email list
//add checkout button to cart

function Home(){
    const [cart, setCart] = useState([])
    const [product, setProduct] = useState(ProductList)
    const [sortByText, setSortByText] = useState("")
    const [shopByText, setShopByText] = useState("All")
     useEffect(() => {
        const value = JSON.parse(localStorage.getItem("cart"))
        if(value){setCart(value)}
     }, [])
        
     

    function Sort(){
        const [visible, setVisible] = useState(false)
        function handleSort(sortBy){
            console.log("Running")
            const productSorted = [...product]; 
            if(sortBy === "Price"){productSorted.sort((a, b) => a.price - b.price)}
                else if(sortBy === "Brand"){productSorted.sort((a, b) => a.brand.localeCompare(b.brand))}
                else if(sortBy === "Part"){productSorted.sort((a, b) => a.part.localeCompare(b.part));}
            setProduct([...productSorted])
            setSortByText(sortBy)
            setVisible(false)
        }
        let isVisible
        if(visible){isVisible = "visible"}else{isVisible = "invisible"}
        return(
            <>
                <div className="w-6/12">
                    <button className="font-bold border-2 w-full" onClick={() => {setVisible(!(visible))}}>Sort by: {sortByText}</button>
                    <div className="absolute z-10 w-1/2">
                        <button className={isVisible + ` flex px-1 border-2 bg-white w-full`} onClick={() => {handleSort("Price")}}>Price</button>
                        <button className={isVisible + ` flex px-1 border-2 bg-white w-full`} onClick={() => {handleSort("Brand")}}>Brand</button>
                        <button className={isVisible + ` flex px-1 border-2 bg-white w-full`} onClick={() => {handleSort("Part")}}>Part</button>
                    </div>
                </div>
            </>
            )
        }


    function ShopBy(){
        const [visible, setVisible] = useState(false)
        let isVisible
        if(visible){isVisible = "visible"}else{isVisible = "invisible"}
        const totalParts = []
        ProductList.forEach((element) => {if(!(totalParts.includes(element.part))){totalParts.push(element.part)}})

        function handleClick(ProductType){
            if(ProductType == "All"){setProduct(ProductList);setShopByText("All"); return}
            const newProduct = []
            ProductList.forEach((element) => {if(element.part == ProductType){newProduct.push(element)}})
            setProduct(newProduct)
            setShopByText(ProductType)
        }
        return(
            <>
                <div className="w-6/12">
                    <button className="font-bold border-2 w-full" onClick={() => {setVisible(!(visible))}}>Shop: {shopByText}</button>
                    <div className="absolute z-10 w-1/2">
                        <button className={isVisible + ` flex px-1 border-2 bg-white  w-full`} onClick={() => {handleClick("All")}}>All</button>
                        {totalParts.map((element) => <button className={isVisible + ` flex px-1 border-2 bg-white  w-full`} onClick={() => {handleClick(element)}}>{element}</button>)}
                    </div>
                </div>
            </>
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
        <div className="flex flex-col justify-center items-center my-10 z-50" key={product.id} part={product.part}>
            <div className="flex justify-center items-center w-10/12 aspect-square border-2 rounded-md drop-shadow-md overflow-hidden">
            <img src={product.IMG} className="object-contain "></img>
            </div>
            <h1 className="font-bold p-1">{product.part}, {product.brand}, {product.name}, ${product.price.toFixed(2)} &nbsp;</h1>
        <button className="border-2 rounded" onClick={() => handleAddCart(product)}>Add to cart</button>
        </div>)
    return(card)
    }
    return(
        <>
            <div className="flex">
                <Sort/>
                <ShopBy/>
                
            </div>
            <Card/>
        </>
    )
}
export default Home