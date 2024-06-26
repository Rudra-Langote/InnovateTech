import React from 'react';
import  'tailwindcss/tailwind.css';
import mnue from '../../public/mnue.png'
import profile from '../../public/account.png'
import Link from 'next/link'
import AppContext from '../context/AppContext';
import { useContext } from 'react';




function expand(){
    document.getElementById("menu").classList.toggle("hidden")
   
    
}


const Header = () => {
    const { sharedValues } = useContext(AppContext)
    
    

  return (
    <nav id="home" className="flex  justify-between items-center p-2 px-4 border-black shadow-xl  text-xl ">
        <span className="text-3xl bg-black text-white pl-1">Innovate<span
                className="bg-white text-3xl text-black font-bold">Tech</span></span>
        <ul className="hidden md:flex items-center space-x-16">
            <li className="hover:bg-black  duration-500 hover:text-white hover:cursor-pointer px-2   py-1 rounded-xl"><Link href={"/"}>Home</Link></li>
            <li className="hover:bg-black duration-500 hover:text-white hover:cursor-pointer px-2  py-1 rounded-xl"><Link href="/#prd">Products</Link></li>
            <li className="hover:bg-black duration-500 hover:text-white hover:cursor-pointer px-2  py-1 rounded-xl"><Link href="/#abt">About</Link></li>
            {
                sharedValues.value1?<li className="hover:bg-black duration-500 hover:text-white hover:cursor-pointer px-2  py-1 rounded-xl"><Link href={"/cart"}>Cart</Link></li>:null
            }
        </ul>
        
            
        {sharedValues.value1?<Link href={({pathname: '/profile'})}> <img src={profile.src} className="h-10 hidden md:block " alt="img"/> </Link>:
        <div id='btn' className=" hidden md:flex space-x-5">
            <Link href={"/login"}>
                <button className="bg-black hover:scale-110 duration-200 text-white text-sm rounded-xl p-1 px-2">Log in</button>
            </Link>
            <Link href={"/signup"}>
                <button className="underline hover:scale-110 duration-200 rounded-xl text-sm p-1 px-2">Sign up</button>
            </Link>
        </div>

        }
        
        <img src={mnue.src} onClick={expand} className="h-10 md:hidden" alt="img"/>
        <div id="menu" className="absolute z-10 right-1 top-14  bg-white hidden shadow-xl border-2 w-40">
            <ul className="flex flex-col text-center items-center">
                
                <li onClick={expand} className=" b py-3 w-40"><Link href={"/"}>Home</Link></li>
                <li className="  w-40 py-3"><Link href={'/#prd'}>Products</Link></li>
                <li className="  w-40 py-3"><Link href={'/#abt'}>About</Link></li>
                {sharedValues.value1? 
                <div>
                <li onClick={expand} className=" w-40 py-3"><Link href={({pathname: '/cart'})}>Cart</Link> </li>
                <li onClick={expand} className=" w-40 py-3"><Link href={({pathname: '/profile'})}>Profile</Link> </li>
                </div> :
                <div>
                <li onClick={expand} className=" w-40 py-3"><Link href={"/login"}>Log in</Link></li>
                <li onClick={expand} className="  w-40 py-3"><Link href={"/signup"}>Sign up</Link></li>
                </div>
                }
            </ul>
        </div>
    </nav>
  )
}

export default Header;

