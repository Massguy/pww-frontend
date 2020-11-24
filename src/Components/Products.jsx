import React,{useState} from 'react';
import { InView } from 'react-intersection-observer';
import axios from 'axios';
import '../App.css'


const Products = () => {
    const [products, setProducts] = useState([]);
    const [orderStatus,updateOrder] = useState('asc');
    const [page,setPage] = useState(1)
  

    const onChange= (inView) => {
        if (inView) {
     
            axios.get(`https://pww-api.herokuapp.com?page=${page}&sortBy=price&order=${orderStatus}`).then((res)=>{
            const newProducts = products.concat(res.data);
            setProducts(newProducts);
            setPage(Math.ceil(newProducts.length/6) + 1);
        }).catch((err)=>{
            console.log(err)
        })
          }
    }
  


 
    const onChangeOrder = (event) => {
        updateOrder(event.target.value);
        setProducts([]);
        setPage(1);
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
        <InView onChange={onChange}>
            <span />
        </InView>
        </>
    )
}

export default Products