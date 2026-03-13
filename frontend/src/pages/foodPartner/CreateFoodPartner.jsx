import axios from 'axios';
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';


const CreateFoodPartner = () => {
  const navigate=useNavigate()

  const [foodItem, setFoodItem] = useState({
    name: '',
    description: ''
  });

  const [file,setFile]=useState(null)






  const formData=new FormData()

   formData.append("video",file)
   formData.append("name",foodItem.name)
   formData.append("description",foodItem.description)

  const handleChange = (e) => {
    const { name, value } = e.target

    setFoodItem((prev) => ({ ...prev, [name]: value }))
  }
    const handleForm = (e) => {

    e.preventDefault();

     axios.post("http://localhost:3000/api/food",formData, { withCredentials: true }).then(res=>{
      console.log("response",res.data);
      // navigate("/home")

      
    })

    



  }

  

  return (
    <>
      <div className='container'>
        <h4 className='text-center'>create food</h4>
        <div className='container-fluid w-75'>
          <div className='card' >
            <form className='mx-auto w-75' action="" onSubmit={handleForm}>
              <div className='mb-2 py-2'>
                <label className='form-label' htmlFor="">Name:</label>
                <input className='form-control' type="text" name="name" id="" placeholder='enter name' onChange={handleChange} value={foodItem.name} />
              </div>
              <div className='mb-2 py-2'>
                <label className='form-label' htmlFor="">Video:</label>
                <input className='form-control' type="file" name="video" id="" onChange={(e)=>(setFile(e.target.files[0]))} />
              </div>
              <div className='mb-2 py-2'>
                <label className='form-label' htmlFor="">Description:</label>
                <input className='form-control' type="text" name="description" id="" placeholder='enter description' onChange={handleChange} value={foodItem.description} />
              </div>
              <div className='mb-2 py-2'>
                <button className='btn btn-success w-100'>Submit</button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  )
}

export default CreateFoodPartner
