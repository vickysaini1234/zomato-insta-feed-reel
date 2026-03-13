import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import axios from 'axios';

const Profile = () => {
    const {id}=useParams();
   const [profile,setProfile]= useState(null)
   const [videos,setVideos]= useState([])

   useEffect(()=>{

      axios.get(`http://localhost:3000/api/food-partner/${id}`,{withCredentials:true})
      .then(res=>{
        setProfile(res.data.foodPartner)
        setVideos(res.data.foodPartner.foodItems)
       
        
      })

   },[id])
    console.log("foodpartner",profile);
        console.log("items",videos);

  return (
    <>

    <div className='container-fluid  '>
        <p className='text-center'>Profile</p>

        <div className='card bg-dark mx-auto' style={{width:"20rem"}}>
            <div className='card d-flex justify-content-center pt-2  m-2 '>
                <div className=' d-flex justify-content-between  p-2'>
                    <img className='rounded-5' style={{height:"4rem",width:"4rem"}} src="https://ichef.bbci.co.uk/ace/standard/976/cpsprodpb/14235/production/_100058428_mediaitem100058424.jpg" alt="...." />
                    <div>
                        <h4 className=''>{profile?.name}</h4>
                    <p>{profile?.email}</p>
                    </div>
                </div>
            </div>
            <div className=' m-2 justify-content-center d-flex flex-wrap bg-white rounded '>
                   {
                    videos.map((item)=>{
                        return(
                            <div key={item._id} className='pt-1'>
                                  
                                     <video style={{width:"8rem",height:"8rem"}}  src={item.video} className="object-fit-cover rounded m-2"
                                        autoPlay
                                        muted
                                        loop
                                        playsInline
                                    ></video>
                                  
                            </div>
                        )
                    })
                   }
            </div>
        </div>
    </div>
      
    </>
  )
}

export default Profile
