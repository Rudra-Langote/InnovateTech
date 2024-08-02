import Head from 'next/head';
import product from '../models/product';
import offer from '../models/offer';
import mongoose from 'mongoose';
import Image from 'next/image';
import React, { useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import Heading from '../components/Heading';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';






export default function Techshop({ products, offers }) {
    const ref = useRef()
    const [serch, setserch] = useState('');
    const pageRef = useRef()
    useEffect(() => {
        let i = 0
        document.getElementById("banner").src = offers[i].img;
        setInterval(() => {
            try {
                document.getElementById("banner").src = offers[i].img;
            } catch (error) {
                // Handle the error here, for example, by setting a default image
                // console.error("Error setting banner src:", error);
                // document.getElementById("banner").src = "default.jpg";
            }
            i = (i + 1) % 3
        }, 3000);
    })

    useGSAP(()=>{
        
        gsap.from(pageRef.current,{
            opacity:0,
            duration:1.5,
            
        })
 
        
    })



    return (
        <div ref={pageRef}>
            <Head>
                <meta name="viewport" content="width=device-width, initial-scale=1.0" />

                <title>TechShop</title>
            </Head>

            <form class="max-w-md  mt-5 mx-auto">
                <div class="relative">

                    <svg className="w-6 absolute top-4 left-2 h-6 text-gray-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                        <path fill-rule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" clip-rule="evenodd" />
                    </svg>

                    <input onChange={(e) => setserch(e.target.value.toLowerCase())} onFocus={() => { ref.current.classList.remove('hidden') }} type="search" id="default-search" class="block w-full bg-black p-4 ps-10 text-white text-sm border  rounded-lg  " placeholder="Search Products..." required />
                </div>
                <div ref={ref} style={{ "scrollbar-width": "1px" }} className='  rounded-lg absolute hidden   z-[5] mx-auto w-full max-w-md overflow-auto bg-white  max-h-[150px] border-[3px] border-black '>
                    {products.filter((item) => { return serch.toLowerCase() === '' ? item : item.name.toLowerCase().includes(serch) }).map((item,index) => {
                        return <Link key={index} prefetch={true} href={{ pathname: '/detail', query: { id: `${item._id}` } }}>
                            <li className=' list-none cursor-pointer  rounded-md hover:bg-black hover:text-white duration-500 border-2 py-2  px-3'>{item.name}</li>
                        </Link>
                    })}






                </div>
            </form>

            <div onClick={() => { ref.current.classList.add('hidden') }} className='  flex overflow-hidden items-center h-80  mx-5 justify-center'>
                <Heading />
            </div>


            <div onClick={() => { ref.current.classList.add('hidden') }} className="mt-5 px-5 flex  flex-col items-center">
                <label htmlFor="img" className="text-center font-bold text-3xl mb-2">Amazing Offers In <span
                    className="underline">TechShop</span></label>
                <Image id="banner" src={"data:image/gif;base64,R0lGODlhAQABAAAAACwAAAAAAQABAAA="} width={100} height={100} className="h-96 w-full rounded-lg mb-5" alt="" />

            </div>

            <div className="flex  flex-col">


                <label id="prd" className=" text-center font-bold text-3xl">Explore Products At <span
                    className="underline">TechShop</span>
                </label>
                <div className="my-10 mx-5">
                    <label className=" font-bold text-xl md:text-2xl">Most Tranding</label>
                    <div   className=" mt-1 shadow-lg p-3 flex flex-row w-auto overflow-auto whitespace-nowrap space-x-5">
                        {products.map((item, index) => {
                            if (index > 9) return null;

                            return <Link  key={item._id} prefetch={true} href={{ pathname: '/detail', query: { id: `${item._id}` } }}> <div className=" hover:shadow-2xl hover:scale-105 duration-300 w-36 min-w-40 h-40 relative flex flex-col items-center">
                                <Image src={item.img} width={100} height={100} className="  h-28 w-28 absolute" alt="" />
                                <span className="absolute bottom-6">{item.name}</span>
                                <span className="absolute bottom-1">₹{item.price}</span>
                            </div>
                            </Link>

                        })}

                    </div>
                </div>

                <div className="my-10 mx-5">
                    <label className=" font-bold text-xl md:text-2xl">Recommended for you</label>
                    <div className=" mt-1  shadow-lg p-3 flex flex-row w-auto overflow-auto whitespace-nowrap space-x-5">
                        {products.map((item, index) => {
                            if (index > 9 && index < 20) {
                                return <Link key={item._id} prefetch={true} href={{ pathname: '/detail', query: { id: `${item._id}` } }}> <div className=" hover:shadow-2xl hover:scale-105 duration-300  w-36 min-w-40 h-40 relative flex flex-col items-center">
                                    <Image src={item.img} width={100} height={100} className=" h-28 w-28 absolute" alt="" />
                                    <span className="absolute bottom-6">{item.name}</span>
                                    <span className="absolute bottom-1">₹{item.price}</span>
                                </div>
                                </Link>
                            } return null;
                        })}

                    </div>
                </div>

                <div className="my-10 mx-5">
                    <label className=" font-bold text-xl md:text-2xl">Newly added</label>
                    <div className=" mt-1  shadow-lg p-3 flex flex-row w-auto overflow-auto whitespace-nowrap space-x-5">
                        {products.map((item, index) => {
                            if (index > 19 && index < 30) {
                                return <Link key={item._id} prefetch={true} href={{ pathname: '/detail', query: { id: `${item._id}` } }}> <div className=" hover:shadow-2xl hover:scale-105 duration-300 w-36 min-w-40 h-40 relative flex flex-col items-center">
                                    <Image src={item.img} width={100} height={100} className=" h-28 w-28 absolute" alt="" />
                                    <span className="absolute bottom-6">{item.name}</span>
                                    <span className="absolute bottom-1">₹{item.price}</span>
                                </div>
                                </Link>
                            } return null;
                        })}
                    </div>
                </div>
            </div>

        </div >
    )

}


export async function getServerSideProps(context) {
    if (!mongoose.connections[0].readyState) {
        await mongoose.connect(process.env.Mongodb_uri)
    }
    let products = await product.find()
    let offers = await offer.find()

    return {
        props: { products: JSON.parse(JSON.stringify(products)), offers: JSON.parse(JSON.stringify(offers)) }
        // 
    }
}