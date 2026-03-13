import React, { useState } from 'react'

const Slider = () => {

     const [current, setCurrent] = useState(0)

    const slider = [
        {
            url: "https://media.istockphoto.com/id/814423752/photo/eye-of-model-with-colorful-art-make-up-close-up.jpg?s=612x612&w=0&k=20&c=l15OdMWjgCKycMMShP8UK94ELVlEGvt7GmB_esHWPYE="
        },
        {
            url: "https://img.freepik.com/free-photo/closeup-shot-beautiful-butterfly-with-interesting-textures-orange-petaled-flower_181624-7640.jpg?semt=ais_user_personalization&w=740&q=80"
        },
        {
            url: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRGa70BgePn1Rsf41oiG6ac0_TAzpKXj4d9qg&s"
        },
        {
            url: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRxXQVeY-qRkyTjIDn_zItt73Ou2VjqOn7CQA&s"
        },
    ]
   

    const preSlider = () => {

        setCurrent((prev) => (prev === 0 ? slider.length - 1 : prev - 1))
    }


    const nextSlider = () => {
       setCurrent((prev) => (prev === slider.length - 1 ? 0 : prev + 1));

    }
    return (
        <>

            <div className='h-[500px] max-w-[auto] w-full   relative group'>
                <div style={{ backgroundImage: `url(${(slider[current].url)})` }} className='w-full h-full rounded-2xl bg-center bg-cover  duration-600'>
                </div>
                {/* left slider */}
                <div className='absolute top-[200px] text-white left-8 hidden group-hover:block -translate-x-0 rounded-full translate-y-[-50%] '>
                    <span>
                        <button className='btn btn-dark' onClick={preSlider}>Pre</button>
                    </span>
                </div>

                {/* rigth slider */}
                <div className='absolute top-[200px] text-white right-8 hidden group-hover:block -translate-x-0 rounded-full translate-y-[-50%]  '>
                    <span>
                        <button className='btn btn-dark' onClick={nextSlider}>Next</button>
                    </span>
                </div>
            </div>

        </>
    )
}

export default Slider
