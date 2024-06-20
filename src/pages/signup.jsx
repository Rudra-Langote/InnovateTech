import Link from "next/link"
import mongoose from "mongoose"
import user from "../models/user"
import { useRouter } from 'next/router'
import { useContext } from "react"
import AppContext from "../context/AppContext"
import Head from "next/head"


const signup = ({users}) => {
  const { setSharedValues } = useContext(AppContext);
  const router = useRouter()
  
  async function get({users,router}){
  
  
  
    let firstName = document.getElementById("fname").value
    let lastName = document.getElementById("lname").value
    let Email = document.getElementById("email").value
    let Password = document.getElementById("pass").value
    let Password2 = document.getElementById("pass2").value
    let Address = document.getElementById("address").value
    let Username = document.getElementById("username").value
  
  
    document.getElementById("fnamewrn").classList.add("hidden")
    document.getElementById("lnamewrn").classList.add("hidden")
    document.getElementById("emailwrn").classList.add("hidden")
    document.getElementById("passwrn").classList.add("hidden")
    document.getElementById("repasswrn").classList.add("hidden")
    document.getElementById("repasswrn2").classList.add("hidden")
    document.getElementById("addwrn").classList.add("hidden")
    document.getElementById("userwrn").classList.add("hidden")
  
    if(firstName == ""){
      document.getElementById("fnamewrn").classList.toggle("hidden")
    }else if(lastName == "")document.getElementById("lnamewrn").classList.toggle("hidden");
    else if(Email == "")document.getElementById("emailwrn").classList.toggle("hidden");
    else if(Username == "")document.getElementById("userwrn").classList.toggle("hidden");
    else if(Address == "")document.getElementById("addwrn").classList.toggle("hidden");
    else if(Password == ""){
      document.getElementById("passwrn").classList.toggle("hidden")
    }else if(Password2 == ""){
      document.getElementById("repasswrn").classList.toggle("hidden")
    }
    else if(Password != Password2){
        document.getElementById("repasswrn2").classList.toggle("hidden")
      }
    else{
      if(users.includes(Username)) document.getElementById("avlwrn").classList.toggle("hidden");
      else{
        document.getElementById("avlwrn").classList.add("hidden");
      
  
  
        var j = [{"firstname" : firstName,
        "lastname" : lastName,
        "email" : Email,
        "username" : Username,
        "pass" : Password2,
        "address" : Address
        }]
      
        const res = await fetch('http://localhost:3000/api/adduser',{
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(j)
        
  
        })

        const data = true
        setSharedValues({value1:data, value2: Username})
        router.push({pathname: '/'})

      }
      
      
    }
   
  
  }
  
  return (
    <>
    <Head>
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>Sign up</title>
    </Head>
    <div className=" flex items-center justify-center p-4">
      <div className="flex  items-center w-3/4 h-auto my-10  rounded-md justify-center py-10   shadow-md border-2 border-gray-400">
        <div className="flex flex-col relative items-center md:border-2 md:px-10 md:w-96  bg-white rounded-lg  md:shadow-2xl border-gray-300  ">
      
          <span className=" text-3xl mt-10  bg-black text-white pl-1">Sign<span
          className="bg-white text-3xl text-black font-bold">up</span></span>
          
          <input id="fname" type="text" placeholder="First Name"   className=" outline-none   rounded-sm border-b-2  mt-10 border-black"  />
          <label id="fnamewrn" className=" text-sm absolute hidden top-36 text-red-700 left-24">*first name required</label>

          <input id="lname" type="text" placeholder="Lastname"   className=" outline-none rounded-sm mt-5 border-b-2 border-black"  />
          <label id="lnamewrn" className=" text-sm absolute hidden top-48 text-red-700 left-24">*last name required</label>

          <input id="email" type="email" placeholder="Email"   className=" outline-none  rounded-sm mt-5 border-b-2 border-black"  />
          <label id="emailwrn" className=" text-sm absolute hidden top-60 text-red-700 left-24">*email required</label>
           
          <input id="username" type="text" placeholder="Enter Username"  className="  outline-none  rounded-sm mt-5 border-b-2 border-black"  />
          <label id="userwrn" className=" text-sm absolute hidden bottom-64 text-red-700 left-24">*username required</label>
          <label id="avlwrn" className=" text-sm absolute hidden bottom-64 text-red-700 left-24">*this username already exists</label>

          <input id="pass" type="password" placeholder="Password"   className=" outline-none  rounded-sm mt-5 border-b-2 border-black"  />
          <label id="passwrn" className=" text-sm absolute hidden bottom-52 text-red-700 left-24">*password required</label>

          <input id="pass2" type="password" placeholder="Re-enter Password"   className=" outline-none  rounded-sm mt-5 border-b-2 border-black"  />
          <label id="repasswrn" className=" text-sm absolute hidden bottom-40 text-red-700 left-24">*please re-enter password</label>
          <label id="repasswrn2" className=" text-sm absolute hidden bottom-40 text-red-700 left-24">*password does not match</label>

          <input id="address" type="text" placeholder="Address"  className="  outline-none  rounded-sm mt-5 border-b-2 border-black"  />
          <label id="addwrn" className=" text-sm absolute hidden bottom-28 text-red-700 left-24">*address required</label>


          <button onClick={() => get({users, router})} className="bg-black hover:scale-110 duration-200 text-white mb-2 text-md rounded-xl mt-10 p-1 px-2">Sign up </button>
          <label className="text-sm text-gray-400">alrady have account?</label>
          <Link href={"/signin"}>
            <button className="underline hover:scale-110 duration-200 rounded-xl text-sm p-2  px-2">Log in</button>
          </Link>
    
        </div>    

      

      </div>
    </div>
    </>
  )
}

export default signup


export async function getServerSideProps(context){
  if(!mongoose.connections[0].readyState){
    await mongoose.connect(process.env.Mongodb_uri)
  }
  let users = await user.distinct("username")

  return{
    props: { users: JSON.parse(JSON.stringify(users))}
  }
}
