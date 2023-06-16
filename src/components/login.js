import {useNavigate, useParams} from 'react-router-dom';
import {useState} from 'react';
import { object, string } from 'yup';
import axios from 'axios';
const registerSchema = object({
  email:string().email().required('email is required'),
  password:string().min(8,'Password must be at least 8 characters').max(15).required('password is required'),
})
const LogIn =()=>{
  const navigate= useNavigate();
  const params = useParams();
  const [loading,setLoading]=useState(false);
  const[details ,setDetails]=useState({
      email:'', 
      password:'',
    })
    const [errors,setErrors]=useState({
      email:'',
      password:'',
}
);
      // input
  const changeHandler=(key, value)=>{
      setDetails({...details,[key]:value}) 
      }
      //submit 
  const handleSubmit =()=>{
        registerSchema.validate(details,{abortEarly:false})
        .then((res)=>{
           setErrors({});
           setLoading(true)
          axios({
            method:'POST',
            url:'https://api.backendless.com/5297FB31-631D-42CA-FFA5-0DB47479DB00/D254504B-C041-4C9F-BAE9-958367DEA67A/users/login',
            data:{   
                login:details["email"],
                password:details["password"]
        }
          }).then((res)=>{
            console.log(res);
            if(res.status === 200){
              const token=res.data["user-token"];
              localStorage.setItem("EcommerAuthToken",token)
              navigate("/productsfeed")
            }
          }).catch((error)=>{
            console.log(error)
            setLoading(false)
             alert(error.response.data.message)
          })
        }).catch((error)=>{
            let errObj={}
            error.inner.map((valErr)=>{
                errObj[valErr.path]=valErr.message;
            })
            setErrors(errObj)
        })
      }
    return(
      <div className="logindiv">
       <div style={{display:'flex',justifyContent:'center',alignItems:'center',marginTop:50}}>
            
          
          <div className="form-group" >
            <h2>Login Page</h2>
            <input type="email"
              value={details.email} 
              className="form-control" 
              placeholder="Enter email"
              style={{margin:20,borderRadius:20}} 
              onChange={(event)=>{
                  changeHandler('email',event.target.value) 
              }} 
            />
            <p className='text-danger'>{errors["email"]}</p>
            <input type="Password"
            value={details.password}
            className="form-control"
            placeholder="Enter Password"
            style={{margin:20,borderRadius:20}}
            onChange={(event)=>{
               changeHandler('password',event.target.value) 
           }} 
           />
           <p className='text-danger'>{errors["password"]}</p>

           {
            loading ?(
              <>
              <div className="spinner-border text-primary" role="status">
                <span className="sr-only"></span>
              </div>
              <div className="spinner-border text-secondary" role="status">
                <span className="sr-only"></span>
              </div>
              <div className="spinner-border text-success" role="status"> 
                <span className="sr-only"></span>
              </div>
              </>
             ) : null
           }<br></br>
          <button type="button" className="btn-block btn-color btn-success btn-rounded"onClick={handleSubmit}>Login</button><br></br><br></br>
        
          <p>Don't have an account Please <a href="/signup">Signup</a> here</p>
        </div>
        </div>
      </div>  
 
    )
}
export default LogIn;