import {useParams ,useNavigate} from 'react-router-dom';
import {useState} from 'react';
import { object, string } from 'yup';
import axios from 'axios';

const registerSchema = object({
    email:string().email().required("email required"),
    name:string().required("name required"),
    password:string().min(8,'Password must be at least 8 characters').max(15).required("password required"),
    confirmPassword:string()
    .min(8,'must be at least 8 characters')
    .max(15)
    .required('confirm password required')
    .test('confirm-pass','confirm password not matching',function(confirmPassword){
        return confirmPassword === this.parent.password;
    }),
})
const SignUp =()=>{
    const params = useParams();
    const navigate= useNavigate();
    const[details ,setDetails]=useState({
        email:'',
        name:'',
        password:'', 
        confirmPassword:''

});
const [errors,setErrors]=useState({
        email:'',
        name:'',
        password:'',
        confirmPassword:''
}
);
const changeHandler=(key, value)=>{
setDetails({...details,[key]:value})
}
const handleSubmit=()=>{    
	registerSchema.validate(details,{abortEarly:false})
    .then((res)=>{
       setErrors({});

       axios({
        method:'POST',
        url:'https://api.backendless.com/5297FB31-631D-42CA-FFA5-0DB47479DB00/D254504B-C041-4C9F-BAE9-958367DEA67A/users/register',
        data:{   
                name: details["name"],
              email: details["email"],
                password: details["password"]
        }
       }).then((responce)=>{
            if(responce.status === 200){
                navigate("/login")
            }
   
    })
    }).catch((error)=>{
        let errObj={}
        error.inner.map((valErr)  => {
            errObj[valErr.path]=valErr.message;
        })
        setErrors(errObj)
    })
}
    return(
        <>
        <marquee style={{color:'blue',marginTop:'30px'}}>E-Commerce App </marquee>
<div className="division">

<div style={{display:'flex',justifyContent:'center',alignItems:'center',marginTop:50}}>

<div className="form-group" >
<h1>Signup page</h1>
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
    <input type="text"
     value={details.name} 
     className="form-control"
     placeholder="Enter Name"
     style={{margin:20,borderRadius:20}}
     onChange={(event)=>{
        changeHandler('name',event.target.value) 
    }} 
    />
    <p className='text-danger'>{errors["name"]}</p>
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
    <input type="Password"
     value={details.confirmPassword}
     className="form-control"
     placeholder="confirm Password"
     style={{margin:20,borderRadius:20}}
     onChange={(event)=>{
        changeHandler('confirmPassword',event.target.value) 
    }} 
    />
  <p className='text-danger'>{errors["confirmPassword"]}</p>
  <button type="button" className="btn-block btn-color btn-success btn-rounded"onClick={handleSubmit}>Signup</button>
   <p>Don't have an account Please <a href="/login">login</a> here</p>
</div>
  </div>
</div> 
</>   
    )
}

export default SignUp;