import React from 'react';
import Image from 'next/image';
import { useRouter } from 'next/router';
import Review from '../components/Review';
import AppContext from '../context/AppContext';
import { useContext } from 'react';
import Head from 'next/head';
import Success from '../components/Orderplaced';
import mongoose from 'mongoose';
import product from '../models/product';





export default function Detail({ data }) {
    const API_URL = process.env.NEXT_PUBLIC_API_URL;
    const { sharedValues } = useContext(AppContext)
    const router = useRouter()
    const productid = router.query
    let img, name, price, desc

    let data2 = data.products
    data2.forEach(element => {
        if (element._id == productid.id) {
            img = element.img
            name = element.name
            price = element.price
            desc = element.desc

        }
    })
    async function cartsend(){
        const fulldata = [
            {
              "username": sharedValues.value2,
              "cart": [
                {
                  "name": name,
                  "photo": img,
                  "price": price
                }
              ],
    
            }
        ]
        await fetch(`${API_URL}/api/cartapi`,{
            method : 'POST',
            headers : {
                'Content-Type': 'application/json'
            },
            body : JSON.stringify(fulldata)
            
        })
        document.getElementById("added").innerHTML = "Added"

        router.push("/cart")
    }
    function handelmsg(){
        setTimeout(() => {
            document.getElementById('suc').classList.toggle('hidden')
        }, 5000);
        document.getElementById('suc').classList.remove('hidden')
        
    }



    return (
        <>
        <Head>
            <meta name="viewport" content="width=device-width, initial-scale=1.0" />
            <title>Product</title>
        </Head>
        <div className=' overflow-hidden '>
            <div className='flex flex-col mt-5 md:flex-row h-auto md:h-4/5 md:w-screen  my-3 '>
                <div className='flex   items-center justify-center h-auto md:h-4/5 md:w-2/5'><Image className='md:h-4/5 md:w-3/5  size-full p-1' quality={100} src={img} width={1000} height={1000} alt="" /></div>
                <div className=' flex flex-col py-10  md:h-4/5 md:w-3/5'>
                    <label className=' p-2 text-5xl font-bold'>{name}</label>
                    <label className=' p-2 pt-5 text-2xl font-medium '>Price : ₹{price}</label>
                    <p className=' p-2 pt-5 text-xl '>{desc}</p>
                    <div className='pt-10 px-2'>
                        <button onClick={handelmsg} className="bg-black hover:scale-110 duration-200 text-white text-sm rounded-xl py-2 px-3 ">Buy now</button>
                        <button onClick={cartsend} id='added' className="bg-black  hover:scale-110 duration-200 text-white text-sm rounded-xl ml-5 py-2 px-3">Add to cart</button>

                    </div>
                </div>

            </div>
            
        </div>
        <div id= 'suc' className=" hidden ">
        <Success />
        </div>
        <Review dataget={data2}/>
        </>
    )
}


// export async function getServerSideProps(context){
//     if(!mongoose.connections[0].readyState){
//         await mongoose.connect(process.env.Mongodb_uri)
//     }
//     let data = await product.find()

//     return{
//         props: { data: JSON.parse(JSON.stringify(data))}
//         // 
//     }
// }


export async function getServerSideProps(context) {
    const API_URL = process.env.NEXT_PUBLIC_API_URL;
    const product = await fetch(`${API_URL}/api/getProducts`)
    const data = await product.json()


    return {
        props: { data }
    }

}
