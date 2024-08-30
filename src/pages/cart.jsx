import React, { useState } from 'react'
import { useContext } from 'react';
import AppContext from '../context/AppContext';
import Link from 'next/link';
import Head from 'next/head';
import Success from '../components/Orderplaced';
import { useRouter } from 'next/router';
import Script from 'next/script';

const Cart = ({ data }) => {


    const router = useRouter()

    const [Amount, setAmount] = useState(0);

    const [isProcessing, setIsProcessing] = useState(false)
    const API_URL = process.env.NEXT_PUBLIC_API_URL || '';
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
                body: JSON.stringify({ amount: Amount * 100 })

             });
            if (!response.ok) {
                throw new Error("Failed to create order");
            }
            const data = await response.json();

            const options = {
                key: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID,
                amount: Amount * 100,
                currency: "INR",
                name: "TechShop",
                description: "Product Purchase",
                order_id: data.orderId,
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


    const { sharedValues } = useContext(AppContext)
    let obj
    data.users.forEach(element => {
        if (element.username == sharedValues.value2) {
            obj = element.cart
        }
    });

    function totalAmount() {
        var gt = 0;
        for (let i = 0; i < obj?.length; i++) {
            gt = parseInt(document.getElementById("total_price" + i).innerHTML) + gt
            setAmount(gt)
        }
    }


    function calc(index) {
        let qt = document.getElementById("quantity" + index).value
        let tp = obj[index].price * qt
        document.getElementById("total_price" + index).innerHTML = tp
        totalAmount()
    }

    async function deleteItem(index) {

        await fetch(`${API_URL}/api/cartapi`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify([{ "username": sharedValues.value2, "id": index }])


        })



    }



    return (
        <>
            <Head>
                <meta name="viewport" content="width=device-width, initial-scale=1.0" />
                <title>Your Cart</title>
            </Head>
            <Script src="https://checkout.razorpay.com/v1/checkout.js" />
            <div onLoad={totalAmount} className='   w-full flex flex-col items-center p-2 justify-center h-screen'>
                <label className=' text-4xl m-4'>Your Shopping Cart</label>
                <label id="grand_total">{`Total Amount : ${Amount} `}</label>
                <button disabled={isProcessing} onClick={sharedValues.value1 ? handlePayment : () => router.push('/signup')} className="bg-black hover:scale-110 duration-200 mb-2  text-white text-sm rounded-xl py-1 px-3 ">Buy all</button>
                <div style={{ height: '110px' }} className=" w-full">
                    <Success />
                </div>
                <div className='  h-full bg-slate-100 p-2 w-full  overflow-auto  md:w-4/5 '>
                    <div className=' flex justify-between border-b-2  border-black w-full'>
                        <label className=' my-5 md:m-5'>Product</label>
                        <div className=' my-5 md:m-5 space-x-10  md:space-x-20'>
                            <lable>Price</lable>
                            <lable>Quantity</lable>
                            <lable>Total</lable>
                        </div>
                    </div>
                    {obj?.map((item, index) => {

                        return <div key={item._id} className=' flex justify-between  items-center border-b-2 h-auto border-black w-full'>
                            <div className=' flex items-center flex-col  md:flex-row md:space-x-10  md:pr-0 md:mx-5 my-10 '>
                                <img className=' h-16 md:h-20' src={item.photo} alt="img" />

                                <div onMouseOver={totalAmount} className=' flex   items-center  space-y-2   justify-center flex-col'>
                                    <label className=' font-medium text-center text-lg'>{item.name}</label>
                                    <Link href={"/cart"}><button onClick={() => deleteItem(index)} className="bg-black hover:scale-110 duration-200 text-white text-sm rounded-xl py-1 px-3 ">Remove</button></Link>
                                </div>

                            </div>
                            <div className=' flex items-center my-5 md:m-5 space-x-5  md:space-x-20'>
                                <lable>₹{item.price}</lable>
                                <input type="number" id={"quantity" + index} onClick={() => calc(index)} onChange={() => calc(index)} className=' border-2 border-black w-16' max={5} min={1} defaultValue={1} />
                                <lable id={"total_price" + index}>{item.price}</lable>
                            </div>
                        </div>
                    })}
                </div>
            </div>
        </>
    )
}

export default Cart;


export async function getServerSideProps(context) {
    const API_URL = process.env.NEXT_PUBLIC_API_URL;
    const product = await fetch(`${API_URL}/api/cartapi`)
    const data = await product.json()


    return {
        props: { data }
    }

}



