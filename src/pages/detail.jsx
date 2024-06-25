import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import { useRouter } from 'next/router';
import Review from '../components/Review';
import AppContext from '../context/AppContext';
import { useContext } from 'react';
import Head from 'next/head';
import Success from '../components/Orderplaced';






export default function Detail({ data, da }) {

    const API_URL = process.env.NEXT_PUBLIC_API_URL;
    const { sharedValues } = useContext(AppContext)
    const router = useRouter()
    const [Loading, isLoading] = useState(false);
    const [Add, setAdd] = useState('Add to cart');
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
    async function cartsend() {
        isLoading(true)
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
    function handelmsg() {
        setTimeout(() => {
            document.getElementById('suc').classList.toggle('hidden')
        }, 3000);
        document.getElementById('suc').classList.toggle('hidden')
    }

    useEffect(()=>{
        Loading ?  setAdd(<div class="flex py-1 px-2 gap-2">
            <div class="w-2 h-2 rounded-full animate-pulse bg-white"></div>
            <div class="w-2 h-2 rounded-full animate-pulse bg-white"></div>
            <div class="w-2 h-2 rounded-full animate-pulse bg-white"></div>
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
                    <div className='flex   items-center justify-center h-auto md:h-4/5 md:w-2/5'><Image className='md:h-4/5 md:w-3/5  size-full p-1' quality={100} src={img} width={1000} height={1000} alt="" /></div>
                    <div className=' flex flex-col py-10  md:h-4/5 md:w-3/5'>
                        <label className=' p-2 text-5xl font-bold'>{name}</label>
                        <label className=' p-2 pt-5 text-2xl font-medium '>Price : ₹{price}</label>
                        <p className=' p-2 pt-5 text-xl '>{desc}</p>
                        <div className='pt-10 px-2'>
                            <button onClick={handelmsg} className="bg-black hover:scale-110 duration-200 text-white text-sm rounded-xl py-2 px-3 ">Buy now</button>
                            <button onClick={cartsend} id='added' className="bg-black  hover:scale-110 duration-200 text-white text-sm rounded-xl ml-5 py-2 px-3">{Add}</button>

                        </div>
                    </div>

                </div>

            </div>
            <div id='suc' className=" hidden">
                <Success />
            </div>
            <Review dataget={da} />
        </>
    )
}





export async function getServerSideProps(context) {
    const API_URL = process.env.NEXT_PUBLIC_API_URL;
    const product = await fetch(`${API_URL}/api/getProducts`)
    const data = await product.json()



    const as = await fetch(`${API_URL}/api/getProducts`, {
        method: 'GET'

    })
    let da = await as.json()




    return {
        props: { data, da }
    }

}

