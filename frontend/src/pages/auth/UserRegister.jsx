import React from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'

const UserRegister = () => {
  
    const nevigate=useNavigate();

      const handleSubmit=async(e)=>{
        e.preventDefault();

        const fullName=e.target.fullname.value;
        const email=e.target.email.value;
        const password=e.target.password.value;
        
         
    const response= await axios.post("http://localhost:3000/api/auth/user/register",{
        fullName,
        email,
       password
     },{
        withCredentials:true
     })

      console.log(response.data);
      
      nevigate("/user/login")

    };
  return (
    <>
      <div className='container shadow mt-5 justify-content-center'>
        <h2 className='text-center my-5 pt-4 fs-8 fw-semibold'>Register User</h2>
        <form action="" className=' rounded mx-auto' style={{width:"75%"}} onSubmit={handleSubmit}>
            <div className='py-2'>
                <label htmlFor="" className='form-label'>FullName</label>
                <input className='form-control borber-none' type="text" placeholder='enter fullname' name='fullname' />
            </div>
            <div  className='py-2'>
                <label htmlFor="" className='form-label'>Email</label>
                <input  className='form-control' type="email" placeholder='enter email' name='email' />
            </div>
            <div  className='py-2'>
                <label htmlFor="" className='form-label'>Password</label>
                <input  className='form-control' type="password" placeholder='enter password' name='password' />
            </div>

            <div  className=' py-5'>
                <button className=' btn btn-success w-100 text-white'>Create Account </button>
            </div>
        </form>
      </div>
    </>
  )
}

export default UserRegister
