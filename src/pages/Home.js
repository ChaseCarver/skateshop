import React, { useState, useEffect } from 'react';
import ProductList from './productList.js';

//TODO
//add a quantity upon add item
//add contact us footer (contact us, pricacy policy, returns)
//add email list
//add checkout button to cart
     
function Home(){
    const [cart, setCart] = useState(null)
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
                    <div className="absolute z-40 w-1/2">
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
            if(ProductType === "All"){setProduct(ProductList);setShopByText("All"); return}
            const newProduct = []
            ProductList.forEach((element) => {if(element.part === ProductType){newProduct.push(element)}})
            setProduct(newProduct)
            setShopByText(ProductType)
        }
        return(
            <>
                <div className="w-6/12">
                    <button className="font-bold border-2 w-full" onClick={() => {setVisible(!(visible))}}>Shop: {shopByText}</button>
                    <div className="absolute z-40 w-1/2">
                        <button className={isVisible + ` flex px-1 border-2 bg-white  w-full`} onClick={() => {handleClick("All")}}>All</button>
                        {totalParts.map((element) => <button key={element.part} className={isVisible + ` flex px-1 border-2 bg-white  w-full`} onClick={() => {handleClick(element)}}>{element}</button>)}
                    </div>
                </div>
            </>
        )
    }


    function handleAddCart(product){
        localStorage.setItem("cart", JSON.stringify([...cart, product]))
            setCart([...cart, product])
            const event = new Event("storage"); 
            window.dispatchEvent(event);
    }
    
    function handleRemoveCart(id){
        const index = cart.findIndex((element) => element.id == id)
        const newCart = [...cart]
        newCart.splice([index], 1)
        setCart(newCart)
        localStorage.setItem("cart", JSON.stringify([...newCart]) )
        const event = new Event("storage")
        window.dispatchEvent(event)
    }


//upon redner, count how many items in the cart are the same, and display 1 item as well as the quantity
//if(element == product){console.log("same")}else{console.log("different")}
    function Card(){
        function handleQuantity(product){
            let quantity = 0
            cart.forEach((element) => {
                if(JSON.stringify(element) === JSON.stringify(product)){
                    console.log("same!");quantity++
                }
            })
            return(quantity)
        }
        const card = product.map((product) => 
            <div className="flex flex-col justify-center items-center my-10 z-10" key={product.id} part={product.part}>
                <div className="flex justify-center items-center w-10/12 md:w-2/4 aspect-square border-2 rounded-md drop-shadow-md overflow-hidden">
                <img src={product.IMG} alt={product.name} className="object-contain "></img>
                </div>
                <h1 className="font-bold p-1">{product.part}, {product.brand}, {product.name}, ${product.price.toFixed(2)} &nbsp;</h1>
            {handleQuantity(product) === 0 ?
            (<button className="border-2 rounded" onClick={() => handleAddCart(product)}>Add to cart</button>)
            :
            (<div className="flex flex-row">
                <button className="border-2 rounded px-1" onClick={() => handleRemoveCart(product.id)}>-</button>
                <p className="border-2 rounded px-1">{handleQuantity(product)}</p>
                <button className="border-2 rounded px-1" onClick={() => handleAddCart(product)}>+</button>
            </div>)}
            </div>)
    return(card)
    }

    return(
        <>
            <div className="flex">
                <Sort/>
                <ShopBy/>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 z-10 md:mt-20">
                {cart ? (<Card/>) : (<>Loading...</>)}
            </div>
        </>
    )
}
export default Home