import axios from 'axios'
import { FaRegBookmark, FaRegComment } from "react-icons/fa";
import { AiOutlineLike } from "react-icons/ai";
import { useState } from 'react'
import { useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import Footer from '../footer/footer'



const Home = () => {

    const nevigate = useNavigate()
    const [data, setData] = useState([])
    useEffect(() => {

        const getdata = async () => {
            await axios.get("http://localhost:3000/api/food", { withCredentials: true }).then(respons => {
                console.log("item", respons.data);

                setData(respons.data.foodItems)
            })
        }

        getdata()

    }, [])

    console.log("food data", data);

    const handleLogout = () => {

        axios.get("http://localhost:3000/api/auth/user/logout", { withCredentials: true })

        nevigate("/user/login")

    }

    const likecount = async (item) => {

        const response = await axios.post("http://localhost:3000/api/food/like", { foodId: item._id }, { withCredentials: true })

        if (response.data.like) {
            console.log("video like");
            setData((pre) => pre.map((v) => v._id === item._id ? { ...v, likeCount: v.likeCount + 1 } : v))
        } else {
            console.log("video unlike");
            setData((pre) => pre.map((v) => v._id === item._id ? { ...v, likeCount: v.likeCount - 1 } : v))
        }

    }
    const savecount = async (item) => {

        const response = await axios.post("http://localhost:3000/api/food/save", { foodId: item._id }, { withCredentials: true })

        if (response.data.save) {
            console.log("video save");

            setData((pre) => pre.map((v) => v._id === item._id ? { ...v, saveCount: v.saveCount + 1 } : v))
        } else {
            console.log("video unsave");
            setData((pre) => pre.map((v) => v._id === item._id ? { ...v, saveCount: v.saveCount - 1 } : v))
        }

    }


    return (
        <>
            <div className='container-fluid'>

                <div className='d-flex justify-content-end py-1 '>
                    <button onClick={handleLogout} className='btn btn-danger'>
                        Logout
                    </button>
                </div>

                <div className='container-fluid bg-dark rounded sticky-top'>
                    <h4 className='text-center text-white py-4  '>home page</h4>
                </div>
                <div className='row g-3 d-flex justify-content-center'>

                    {

                        data?.map((item) => {
                            return (

                                <div key={item._id} className='col-10 col-lg-4 col-xl-4 col-sm-2 col-md-2 py-1' style={{ width: "22rem" }}>
                                    <div className=" card rounded bg-dark">
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

                                            <Link to={"/food-partner/" + item.foodPartner} className="btn btn-primary">Go somewhere</Link>

                                        </div>

                                    </div>
                                </div>

                            )
                        })


                    }

                </div>

            </div >
            <Footer />
        </>
    )
}

export default Home
