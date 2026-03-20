import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { FaRegBookmark, FaRegComment } from "react-icons/fa";
import { AiOutlineLike } from "react-icons/ai";
import { useNavigate ,Link} from 'react-router-dom'

const Save = () => {

    const [data,setData]=useState([])

    const nevigate=useNavigate()

    const handleBack=()=>{
        nevigate(-1)
    }
   
    useEffect(()=>{
        const fatchData= async()=>{

            const response=await axios.get("http://localhost:3000/api/food/save",{withCredentials:true})

           const dataItem=response.data.savefood.map((item)=>({
            _id:item.food._id,
             video:item.food.video,
             description:item.food.description,
             likeCount:item.food.likeCount,
             saveCount:item.food.saveCount,

            
           }))

           setData(dataItem)
       
       

        }

        fatchData()
    },[])


  return (
    <>
    <div className='mx-4 py-4'>
        <button onClick={handleBack} className='btn btn-success'>
        Back
    </button>
    </div>

      <div className='row g-3 d-flex justify-content-center'>
      
                          {
      
                              data.map((item) => {
                                  return (
      
                                      <div key={item._id} className='col-10 col-lg-4 col-xl-4 col-sm-2 col-md-2 py-1' style={{ width: "22rem" }}>
                                          <div  className=" card rounded bg-dark">
                                              <video src={item.video} className="object-fit-cover rounded object-fit-contain object-fit-fill m-2" style={{ height: "26rem" }}
                                                  autoPlay
                                                  muted
                                                  loop
                                                  playsInline
                                              />
                                              <div className='group'>
                                                  <div className='absolute text-white text-2xl top-4/10 right-4 '>
                                                      <button onClick={() => likecount(item)} className='  '><  AiOutlineLike /></button>
                                                      <p className='text-xl '>{item.likeCount}</p>
                                                  </div>
                                                  <div className='absolute text-white text-2xl top-2/4  right-4'>
                                                      <button onClick={() => savecount(item)} className=' '><  FaRegBookmark /></button>
                                                      <p className='text-xl '>{item.saveCount}</p>
                                                  </div>
                                                  <div className='absolute text-white text-2xl top-3/5 right-4  '>
                                                      <button className=' '><  FaRegComment /></button>
                                                      <p className='text-xl'>{ }</p>
                                                  </div>
                                              </div>
                                              <div className=" card card-body m-2">
                                                  <div className='bg-success rounded p-2 d-flex justify-content-between'>
                                                   <Link className='text-decoration-none text-white' to={"/home"}>Home</Link>
                                                   <Link className='text-decoration-none text-white' to={"/save"}>Save</Link>
                                                  </div>
                                                  <h5 className="card-title">{item.description}</h5>
                                                  <p className="card-text">{item.name}</p>
                                              
                                                  {/* <Link to={"/food-partner/"+ item.foodPartner} className="btn btn-primary">Go somewhere</Link> */}
                                                  
                                              </div>
      
                                          </div>
                                      </div>
      
                                  )
                              })
      
      
                          }
      
                      </div>
      
    </>
  )
}

export default Save
