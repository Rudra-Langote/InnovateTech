import Head from 'next/head'
import product from '../models/product'
import offer from '../models/offer'
import mongoose from 'mongoose'
import Image from 'next/image'
import React, { useEffect } from 'react'
import Link from 'next/link'



//  function id_getter(id){
//     console.log(id);

// }




export default function Innovatetch({products, offers}) {
    useEffect(()=>{
        let i = 0
        document.getElementById("banner").src = offers[i].img;
        setInterval(()=> {
            try {
                document.getElementById("banner").src = offers[i].img;
              } catch (error) {
                // Handle the error here, for example, by setting a default image
                // console.error("Error setting banner src:", error);
                // document.getElementById("banner").src = "default.jpg";
              }
            i=(i+1)%3
        }, 3000);
    })


    
    return (
        <div>
            <Head>
                <meta name="viewport" content="width=device-width, initial-scale=1.0" />
                <title>InnovateTech</title>
            </Head>
            
            <div className="mt-14 px-5 flex  flex-col items-center">
                <label htmlFor="img" className="text-center font-bold text-3xl mb-2">Amazing Offers In <span
                className="underline">InnovateTech</span></label>
                <Image id="banner" src={"data:image/gif;base64,R0lGODlhAQABAAAAACwAAAAAAQABAAA="} width={100} height={100} className="h-96 w-full mb-5" alt=""/>

            </div>
            
            <div className="flex  flex-col">

                <label id="prd" className=" text-center font-bold text-3xl">Explore Products At <span
                    className="underline">InnovateTech</span>
                </label>
                <div className="my-10 mx-5">
                   <label className=" font-bold text-xl md:text-2xl">Speakers & Headphones</label>
                    <div className=" mt-1 shadow-lg p-3 flex flex-row w-auto overflow-auto whitespace-nowrap space-x-5">
                        {products.map((item,index)=> {
                         if(index >9)return null;   
                         
                        return <Link key={item._id} href={{pathname: '/detail', query: {id: `${item._id}`}}}> <div   className=" hover:shadow-2xl hover:scale-105 duration-300 w-36 min-w-40 h-40 relative flex flex-col items-center">
                            <Image src={item.img} width={100} height={100}  className=" h-28 w-28 absolute" alt="" />
                            <span className="absolute bottom-6">{item.name}</span>
                            <span className="absolute bottom-1">₹{item.price}</span>
                        </div>
                        </Link>

                    })}
                               
                    </div>
                </div>

                <div className="my-10 mx-5">
                    <label className=" font-bold text-xl md:text-2xl">Smartphones & Tablets</label>
                    <div className=" mt-1  shadow-lg p-3 flex flex-row w-auto overflow-auto whitespace-nowrap space-x-5">
                    {products.map((item,index)=> {
                         if(index >9 && index < 20){
                            return <Link key={item._id} href={{pathname: '/detail', query: {id: `${item._id}`}}}> <div  className=" hover:shadow-2xl hover:scale-105 duration-300  w-36 min-w-40 h-40 relative flex flex-col items-center">
                                        <Image src={item.img} width={100} height={100} className=" h-28 w-28 absolute" alt="" />
                                        <span className="absolute bottom-6">{item.name}</span>
                                        <span className="absolute bottom-1">₹{item.price}</span>
                                        </div>
                                    </Link>
                         }return null;
                        })}
                       
                    </div>
                </div>

                <div className="my-10 mx-5">
                    <label className=" font-bold text-xl md:text-2xl">Pc & Accessories</label>
                    <div className=" mt-1  shadow-lg p-3 flex flex-row w-auto overflow-auto whitespace-nowrap space-x-5">
                        {products.map((item,index)=> {
                            if(index >19 && index < 30){
                                return <Link key={item._id} href={{pathname: '/detail', query: {id: `${item._id}`}}}> <div  className=" hover:shadow-2xl hover:scale-105 duration-300 w-36 min-w-40 h-40 relative flex flex-col items-center">
                                        <Image src={item.img} width={100} height={100} className=" h-28 w-28 absolute" alt="" />
                                        <span className="absolute bottom-6">{item.name}</span>
                                        <span className="absolute bottom-1">₹{item.price}</span>
                                       </div>
                                       </Link>
                            }return null;
                        })}
                    </div>
                </div>
            </div>

        </div >
    )
    
}

export async function getServerSideProps(context){
    if(!mongoose.connections[0].readyState){
        await mongoose.connect(process.env.Mongodb_uri)
    }
    let products = await product.find()
    let offers = await offer.find()

    return{
        props: { products: JSON.parse(JSON.stringify(products)), offers: JSON.parse(JSON.stringify(offers))}
        // 
    }
}
