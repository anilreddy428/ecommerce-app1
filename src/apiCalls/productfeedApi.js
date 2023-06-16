import axios from 'axios';
 export const loadAllProducts =async()=>{
    return await axios({
        method:'GET',
        url:'https://api.chec.io/v1/products',
        params:{
            limit: 25,
             page: 1
        },
        headers:{
    
            "X-Authorization": "pk_185066f1f96affca255ca48cd4a64803a4b791d6d0d5b"
        }
    })
}