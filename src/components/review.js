import React from 'react'
import Arrow from '../../public/send.png'
import { useRouter } from 'next/router'
import AppContext from '../context/AppContext';
import { useContext } from 'react';


const review = ({dataget}) => {
    const router = useRouter()
    const { sharedValues } = useContext(AppContext)
    const productid = router.query

    async function send(){
        const data = document.getElementById("usertext").value
        const fulldata = [
            {
                "_id": productid.id,
                "reviews": [
                    { "key": sharedValues.value2, "value": data }
                ]
            }
        ]
        await fetch('http://localhost:3000/api/addProducts',{
            method : 'POST',
            headers : {
                'Content-Type': 'application/json'
            },
            body : JSON.stringify(fulldata)
            
        })
    }
    let obj
    dataget.products.forEach(element => {
        if(element._id == productid.id){
            obj = element.reviews
        }
    });
    


    return (

        <div className=' max-h-screen px-4 border-2 bg-gray-100 overflow-auto'>
            <label className=' text-2xl font-bold p-2'>Reviews</label>
            <div className=' relative flex flex-col items-center p-2  h-auto md:m-10 '>
                <textarea id='usertext' type="url" className='w-full p-2 pr-9 border-2 border-black text-black overflow-y-hidden min-h-20 max-h-20 rounded-lg' placeholder='Enter your feeback of the product' />
                <img src={Arrow.src} onClick={send} className=' h-7  absolute right-4 md:right-5 top-8' alt="" />
            </div>

            {obj.toReversed().map((item) =>{
            return <div className='self-start h-auto  max-w-fit border-2 shadow-xl p-2 my-4 rounded-md bg-white'>
                    <label className=' font-medium p-2'>{item.key}</label>
                    <p className='self-start text-sm p-2 py-2 '>{item.value}</p>
                </div> 
            })}
        </div>
    )
}

export default review


