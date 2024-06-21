import Link from "next/link"
import React from "react"
import mongoose from "mongoose"
import user from "../models/user"
import { useRouter } from "next/router"
import { useContext } from "react"
import AppContext from "../context/AppContext"
import Head from "next/head"


const Login = ({username,pass}) => {
  const { setSharedValues } = useContext(AppContext);
  const router = useRouter()
  

  function get({username,pass, router}){
    document.getElementById("wrn").classList.add("hidden");
    let Username = document.getElementById("username").value
    let Password = document.getElementById("pass").value
    if(Username == "") document.getElementById("wrn").classList.toggle("hidden");
    else if(Password == "") document.getElementById("wrn").classList.toggle("hidden");
    else if(!username.includes(Username))document.getElementById("wrn").classList.toggle("hidden");
    else if(!pass.includes(Password))document.getElementById("wrn").classList.toggle("hidden");
    else{
      const i = username.indexOf(Username)
      if(pass[i] == Password){
        document.getElementById("wrn").classList.add("hidden");
        const data = true
        setSharedValues({value1:data, value2: Username})
        router.push({pathname: '/'})

      }
      else{
        document.getElementById("wrn").classList.toggle("hidden");
        
      }  
    }

    
  }
  return (
    <>
    <Head>
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>Log in</title>
    </Head>
    <div className=" flex items-center justify-center p-4">
      <div className="flex  items-center w-3/4 h-auto my-10  rounded-md justify-center py-10   shadow-md border-2 border-gray-400">
        <div className="flex flex-col relative items-center md:border-2 md:w-80  bg-white rounded-lg  md:shadow-2xl border-gray-300  ">
      
          <span className=" text-3xl mt-10  bg-black text-white pl-1">Log<span
          className="bg-white text-3xl text-black font-bold">in</span></span>

          <label id="wrn" className=" text-sm absolute hidden  top-20 text-red-700 left-14">username or password is incorrect</label>

          <input type="text" id="username" placeholder="Username"    className=" outline-none border-b-2  rounded-sm text-center mt-10  border-black"  />

          <input type="password" id="pass" placeholder="Password"   className=" outline-none border-b-2 text-center rounded-sm mt-10  border-black"  />
          
          <button onClick={()=> get({username, pass,router})} className="bg-black text-white mb-2 text-md rounded-xl mt-10 p-1 px-2">Log in</button>
          <label>or</label>
          <Link href={"/signup"}>
            <button className="underline rounded-xl text-sm p-2  px-2">Sign up</button>
            </Link>
        </div>    

      

      </div>
      
    </div>
  </>
  )
}

export default Login;



export async function getServerSideProps(context){
  if(!mongoose.connections[0].readyState){
    await mongoose.connect(process.env.Mongodb_uri)
  }
  let username = await user.distinct("username")
  let pass = await user.distinct("pass")


  return{
    props: { username: JSON.parse(JSON.stringify(username)),pass: JSON.parse(JSON.stringify(pass))}
  }
}
