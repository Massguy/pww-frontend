import React,{useEffect,useState} from 'react';
import axios from 'axios';
import '../App.css'


const Products = () => {
    const [products, setProducts] = useState([]);
    const [orderStatus,updateOrder] = useState('desc')
  
    useEffect(()=>{
        axios.get("https://pww-api.herokuapp.com").then((res)=>{
            console.log('res data', res.data); 
            let sortedProducts = sortProdcutsByPrice(res.data);
            setProducts(sortedProducts)
        }).catch((err)=>{
            console.log(err)
        })
       
    },[])
  

    const sortProdcutsByPrice = (products) => {
        let sortedProducts = products.sort(function(item1, item2){
            return orderStatus === "asc" ? item2.price.value - item1.price.value : item1.price.value - item2.price.value;
        });
        return sortedProducts;
    }
 
    const onChangeOrder = (event) => {
        updateOrder(event.target.value);
        let sortedProducts = sortProdcutsByPrice(products);
        setProducts(sortedProducts)
    }

    return(
        <>
        <h1>List of products</h1>
        <select onChange={onChangeOrder} value={orderStatus}>
            <option value="asc" >Ascending</option>
            <option value="desc" >Descending</option>
        </select>
        {products.map((product)=>(
            <div key={product._id} className="productsContainer">
                <div className="productName">
                {product.name}
                </div>
                <div className="productDescription">
                {product.description}
                </div>
                <div className="productType">
                {product.type}
                </div>
                <div className="productDepartment">
                {product.department}
                </div>
                {product.weight}
                <div className="productPrice">
                £ {product.price.value} {product.price.currency}
                </div>
                
            </div>
        ))}
        </>
    )
}

export default Products