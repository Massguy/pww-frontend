import React,{useState,useEffect} from 'react';
import { InView } from 'react-intersection-observer';
import axios from 'axios';
import '../App.css'


const Products = () => {
    const [products, setProducts] = useState([]);
    const [orderStatus,updateOrder] = useState('asc');
    const [page,setPage] = useState(1)
    const [darkMode, setDarkMode] = useState(getInitialMode());
        useEffect(() => {
            localStorage.setItem("dark", JSON.stringify(darkMode));
        }, [darkMode]);
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

    function getInitialMode(){
        const savedMode = JSON.parse(localStorage.getItem('dark'));
        return savedMode || false
    }
  


 
    const onChangeOrder = (event) => {
        updateOrder(event.target.value);
        setProducts([]);
        setPage(1);
    }

    return(
        <div className={darkMode ? "dark-mode":"light-mode"}>
            <nav>
                <h3>PWW MarketPlace</h3>
                <div className="buttonContainer">
                <button onClick={()=>setDarkMode(prevMode => !prevMode)}>Toggle dark/light</button>
                </div>
            </nav>
        
        <div className="container">
            <label>Price Filter</label>
        <select onChange={onChangeOrder} value={orderStatus}>
            
            <option value="asc" >Ascending</option>
            <option value="desc" >Descending</option>
        </select>
        <div className="productsBox">
        {products.map((product)=>(
            <div key={product._id} className="productsContainer">
                <div className="productName">
                    <label>Product Name: </label>
                 {product.name}
                </div>
                <div className="productDescription">
                <label>Description: </label>
                {product.description}
                </div>
                <div className="productType">
                <label>Type: </label>
                {product.type}
                </div>
                <div className="productDepartment">
                <label>Department: </label>
                {product.department}
                </div>
                <label>Weight: </label>
                {product.weight}
                <div className="productPrice">
                <label>Price: </label>
                £ {product.price.value} {product.price.currency}
                </div>
                
            </div>

        ))}
        </div>
        <InView onChange={onChange}>
            <span />
        </InView>
        </div>
        </div>
    )
}

export default Products