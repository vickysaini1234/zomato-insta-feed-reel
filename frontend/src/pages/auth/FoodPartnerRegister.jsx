import React from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'

const FoodPartnerRegister = () => {

     const nevigate=useNavigate();

      const handleSubmitform=async(e)=>{
        e.preventDefault();

        const name=e.target.fullname.value;
        const email=e.target.email.value;
        const password=e.target.password.value;
        
         
        const response= await axios.post("http://localhost:3000/api/auth/food-partner/register",{
        name,
        email,
       password
     },{
        withCredentials:true,
     })

      console.log(response.data);
      
      nevigate("/create-food")

    }

    

  
  return (
    <>
    <div className='container shadow mt-5 justify-content-center'>
        <h2 className='text-center my-5 pt-4 fs-8 fw-semibold'>Register Food-Partner</h2>
        <form action="" className=' rounded mx-auto' style={{width:"75%"}} onSubmit={handleSubmitform} >
            <div className='py-2'>
                <label htmlFor="" className='form-label'>FullName</label>
                <input className='form-control borber-none' type="text" placeholder='enter fullname' name='fullname' />
            </div>
            <div  className='py-2'>
                <label htmlFor="" className='form-label'>Email</label>
                <input  className='form-control' type="email" placeholder='enter email' name='email'/>
            </div>
            <div  className='py-2'>
                <label htmlFor="" className='form-label'>Password</label>
                <input  className='form-control' type="password" placeholder='enter password' name='password' />
            </div>

            <div  className=' py-5'>
                <button className=' btn btn-success w-100 text-white'>Create Food-Partnrt Account</button>
            </div>
        </form>
      </div>
      
    </>
  )
}

export default FoodPartnerRegister
