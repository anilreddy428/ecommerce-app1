import { useState,useEffect} from "react";
import axios from 'axios';
import { useNavigate } from "react-router-dom";
import {loadAllProducts} from '../apiCalls/productfeedApi.js';
import { toast } from 'react-toastify';
const ProductFeed =()=>{
    const[products,setProducts]=useState([]);
		const[cartInfo,setCartInfo]=useState({});
   
    const navigate =useNavigate();

		const createOrLoadCart =()=>{
			const cartID = localStorage.getItem("CARTID");
			if(cartID){
				axios({
					method:'GET',
					url:`https://api.chec.io/v1/carts/${cartID}`,
					headers:{'X-Authorization': 'pk_185066f1f																								96affca255ca48cd4a64803a4b791d6d0d5b'}
					
				}).then((res)=>{
					console.log(res)
					setCartInfo(res.data)
				}).catch((error)=>{
					console.log(error)
				})
				
			}else{
				axios ({
					method:'GET',
					url:`https://api.chec.io/v1/carts/${cartID}`,
					headers:{'X-Authorization': 'pk_185066f1f96affca255ca48cd4a64803a4b791d6d0d5b'},
					
				}).then((responce)=>{
					
						localStorage.setItem("CARTID",responce.data.id)
						setCartInfo(responce.data)
					
				}).catch((error)=>{
					console.log('error')
				})
			}
		}

    const loadProducts = async()=>{
			try{
				const res = await loadAllProducts();
				setProducts(res.data.data)
			}catch(error){
				console.log(error)
			}
       
    }
   
    useEffect (()=>{
        loadProducts();
		createOrLoadCart();
    },[])

const handleLogout =()=>{
    localStorage.getItem("EcommerAuthToken","")
    navigate("/login")
} 
const handleCreateAddToCart =(product_id)=>{
	const cartID = localStorage.getItem("CARTID");
console.log(product_id,'clicked')
  axios({
		  method:'POST',
			url:`https://api.chec.io/v1/carts/${cartID}`,
			headers:{'X-Authorization': 'pk_185066f1f96affca255ca48cd4a64803a4b791d6d0d5b'},
			data:{ 
				id: product_id,
				quantity: 1
			}
	}).then((res)=>{
		setCartInfo(res.data.cart)
		console.log(res)
	}).catch((err)=>{
	
	})

}
const handleDeleteCart =(product_id)=>{
	const cartID = localStorage.getItem("CARTID");
	axios({
		method:'DELETE',
		url:`https://api.chec.io/v1/carts/${cartID}`,
		headers:{'X-Authorization': 'pk_185066f1f96affca255ca48cd4a64803a4b791d6d0d5b'}
	}).then((res)=>{
		console.log(res)
		setCartInfo(res.data.cart)
	}).catch((error)=>{
		console.log(error)
	})
	}
    const addedProducts =cartInfo.line_items ? cartInfo.line_items.map((product)=>product.product_id) :[];
    return(
    <div className="division">
		<div className="header">
        		<h1 style={{textAlign:'center'}}>ECommerce App </h1>
				<button type="button" className="btn-block btn-color btn-success btn-rounded"onClick={handleLogout}>Logout</button>
						<p>products added -{cartInfo.total_items}</p>
						<p>Grand Total -{cartInfo.subtotal ? cartInfo.subtotal.formatted_with_code:"0 INR"}</p>
		
				
        </div>
		< div style={{display:'flex',flexWrap:'wrap', marginTop:50,justifyContent:'center',alignItems:'center '}}>
        {
           products.map((product)=>{
            const id= product.id; 
            return(
                <div className="card" style={{width: 400,margin:20}}>
                    <img className="card-img-top" src={product.image.url} style={{width:'100%',height:300}}alt="No image here"/>
                 <div className="card-body">
                     <h5 className="card-title">{product.name}</h5>
                     <h6 className="text-success">price -{product.price.formatted_with_symbol}</h6>
                     <p className="card-text">{product.description}</p>             
                </div>
								{
									addedProducts.includes(product.id)?(
										<button className="btn btn-danger"style={{width:'100%'}} onClick={()=>{handleDeleteCart(product.id)}}>Remove </button>
									):(
										<button className="btn btn-primary" style={{width:'100%'}} onClick={()=>{handleCreateAddToCart(product.id)}}>Add To Cart</button>
									)
								}
								
                </div>
            )
            }
            )}
        </div>
    </div>
    )
}
export default ProductFeed;