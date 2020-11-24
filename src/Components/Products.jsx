import React,{useEffect,useState} from 'react';
import axios from 'axios';

const Products = () => {
    const [products, setProducts] = useState([]);
    useEffect(()=>{
        axios.get("https://pww-api.herokuapp.com").then((res)=>{
            setProducts(res.data)
        }).catch((err)=>{
            console.log(err)
        })
    },[])
    return(
        <>
        <h1>List of products</h1>
        {products.map((product)=>(
            <div key={product._id}>
                {product.name}
            </div>
        ))}
        </>
    )
}

export default Products