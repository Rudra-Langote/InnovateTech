import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import { useRouter } from 'next/router';
import Review from '../components/Review';
import AppContext from '../context/AppContext';
import { useContext } from 'react';
import Head from 'next/head';
import { getServerSideProps as fetchData } from './api/server';
import Success from '../components/Orderplaced';
// import mongoose from 'mongoose';
// import product from '../models/product'






export default function Detail({ data}) {

    const API_URL = process.env.NEXT_PUBLIC_API_URL || '';
    const { sharedValues } = useContext(AppContext)
    const router = useRouter()
    const [Loading, isLoading] = useState(false);
    const [Add, setAdd] = useState('Add to cart');
    
    
   
    async function cartsend() {
        isLoading(true)
        const fulldata = [
            {
                "username": sharedValues.value2,
                "cart": [
                    {
                        "name": data.name,
                        "photo": data.img,
                        "price": data.price
                    }
                ],

            }
        ]
        await fetch(`${API_URL}/api/cartapi`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(fulldata)

        })

        router.push("/cart")
        isLoading(false)
    }

    
    const [isProcessing, setIsProcessing] = useState(false)
    
    const handlePayment = async () => {
        setIsProcessing(true);
        
        try {
            const res = await fetch(`${API_URL}/api/adduser`,{
                method:"POST",
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({username : sharedValues.value2})

            });
            if (!res.ok) {
                throw new Error("User not found");
            }
            const user = await res.json();

            const response = await fetch(`${API_URL}/api/createorder`, { 
                method: "POST",
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ amount: data.price * 100 })

             });
            if (!response.ok) {
                throw new Error("Failed to create order");
            }
            const dataord = await response.json();

            const options = {
                key: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID,
                amount: data.price * 100,
                currency: "INR",
                name: "TechShop",
                description: "Product Purchase",
                order_id: dataord.orderId,
                handler: function (response) {
                    console.log("Payment Successful", response);
                },
                prefill: {
                    name: user.firstname + user.lastname,
                    email: user.email,
                },
                theme: {
                    color: "#3399cc"
                }
            };
            const rzp1 = new window.Razorpay(options);
            rzp1.open();
        } catch (error) {
            console.error("Error in Payment:", error);
        } finally {
            setIsProcessing(false);
        }
    };
    

    useEffect(()=>{
        Loading ?  setAdd(<div class="flex py-1 px-2 gap-2">
            <div class="w-2 h-2 rounded-full animate-pulse bg-black"></div>
            <div class="w-2 h-2 rounded-full animate-pulse bg-black"></div>
            <div class="w-2 h-2 rounded-full animate-pulse bg-black"></div>
        </div>) : setAdd('Add to cart');
      })


     return (
         <>
             <Head>
                 <meta name="viewport" content="width=device-width, initial-scale=1.0" />
                 <title>Product</title>
             </Head>
             <div className=' overflow-hidden '>
                 <div className='flex flex-col mt-5 md:flex-row h-auto md:h-4/5 md:w-screen  my-3 '>
                     <div className='flex   items-center justify-center h-auto md:h-4/5 md:w-2/5'><Image className='md:h-4/5 md:w-3/5  lfedin size-full p-1' quality={100} src={data.img} width={500} height={500} alt="" /></div>
                     <div className=' flex flex-col py-10  md:h-4/5 md:w-3/5'>
                         <label className=' p-2 rfedin text-5xl font-bold'>{data.name}</label>
                         <label className=' p-2 rfedin pt-5 text-2xl font-medium '>Price : ₹{data.price}</label>
                         <p className=' p-2 pt-5 rfedin text-xl '>{data.desc}</p>
                         <div className='pt-10 px-2'>
                             <button disabled={isProcessing} onClick={sharedValues.value1? handlePayment :()=> router.push('/signup')} className="bg-black upfedin hover:scale-110 duration-200 text-white text-sm rounded-xl py-2 px-3 ">Buy now</button>
                             <button onClick={sharedValues.value1?cartsend:()=> router.push('/signup')} id='added' className="bg-black upfedin  hover:scale-110 duration-200 text-white text-sm rounded-xl ml-5 py-2 px-3">{Add}</button>

                         </div>
                     </div>

                 </div>

             </div>
             <div style={{height:'70px'}}>
                 <Success/>
             </div>
            <Review dataget={data.reviews} />
         </>
     )
}

export {fetchData as getServerSideProps};





// export async function getServerSideProps(context) {
    
//     const url = context.req.url
//     let url_arr = url.split("=")
//     let id = url_arr[1]
//     if (!mongoose.connections[0].readyState) {
//         await mongoose.connect(process.env.Mongodb_uri)
//     }
//     let data = await product.findById(id)



//     return {
//         props: { data: JSON.parse(JSON.stringify(data)) }
//     }

// }

