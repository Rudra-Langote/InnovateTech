import React from 'react'
import { useContext } from 'react';
import AppContext from '../context/AppContext';
import Link from 'next/link';
import Head from 'next/head';

const cart = ({data}) => {
    const { sharedValues } = useContext(AppContext)
    let obj
    data.users.forEach(element =>{
        if(element.username == sharedValues.value2){
            obj = element.cart
        }
    });

    function totalAmount(){
        var gt = 0;
        for(let i = 0 ; i < obj?.length; i++){
            gt = parseInt(document.getElementById("total_price"+i).innerHTML) + gt
        }
        
        document.getElementById("grand_total").innerHTML = "Total Amount : ₹"+gt
    }

    
    function calc(index){
        let qt = document.getElementById("quantity"+index).value
        let tp = obj[index].price*qt
        document.getElementById("total_price"+index).innerHTML = tp
        totalAmount()
    }

    async function deleteItem(index){
        
        await fetch(`http://localhost:3000/api/cartapi`,{
            method : 'DELETE',
            headers : {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify([{"username": sharedValues.value2, "id":index}])
            
            
        })
        
        

    }


  return (
    <>
    <Head>
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>Your Cart</title>
    </Head>
    <div onLoad={totalAmount} className=' flex flex-col items-center p-5  justify-center h-screen'>
        <label className=' text-4xl m-4'>Your Shopping Cart</label>
        <label id="grand_total">Total Amount : 0 </label>
        <button className="bg-black hover:scale-110 duration-200 text-white text-sm rounded-xl py-1 px-3 ">Buy all</button>
      <div className='  h-full overflow-auto w-auto  md:w-4/5 '>
        <div className=' flex justify-between border-b-2  border-black w-full'>
            <label className=' m-5'>Product</label>
            <div className=' m-5 space-x-20'>
                <lable>Price</lable>
                <lable>Quantity</lable>
                <lable>Total</lable>
            </div>
        </div>
        {obj?.map((item, index)=>{

            return <div  className=' flex justify-between items-center border-b-2 h-auto border-black w-full'>
            <div className=' flex items-center md:space-x-32 space-x-8 mx-5 my-10 '>
                <img className='  h-20' src={item.photo} alt="img" />
                
                <div onMouseOver={totalAmount} className=' flex  items-center h-auto space-y-2 w-auto  justify-center flex-col'>
                    <label className=' font-medium text-lg'>{item.name}</label>
                    <Link href={"/cart"}><button onClick={()=> deleteItem(index)} className="bg-black hover:scale-110 duration-200 text-white text-sm rounded-xl py-1 px-3 ">Remove</button></Link>
                </div>
                
            </div>
            <div className=' flex items-center  m-5 space-x-20'>
                <lable>₹{item.price}</lable>
                <input type="number" id={"quantity"+index} onClick={()=> calc(index)} className=' border-2 border-black w-16' max={5} min={1} defaultValue={1}  />
                <lable id={"total_price"+index}>{item.price}</lable>
            </div>
        </div>
        })}
      </div>
    </div>
    </>
  )
}

export default cart


export async function getServerSideProps(context) {
    const product = await fetch('http://localhost:3000/api/cartapi')
    const data = await product.json()


    return {
        props: { data }
    }

}



