import Link from "next/link"
import mongoose from "mongoose"
import React, { useState } from "react"
import user from "../models/user"
import { useRouter } from 'next/router'
import { useContext } from "react"
import AppContext from "../context/AppContext"
import Head from "next/head"


const Signup = ({ users }) => {
  const API_URL = process.env.NEXT_PUBLIC_API_URL;
  const { setSharedValues } = useContext(AppContext);
  const router = useRouter()
  const [Error, setError] = useState("");
  const [Loading, isLoading] = useState(false);
  const [Sup, setSup] = useState('Sign up');

  async function get({ users, router }) {
    lod()

    document.getElementById("dyserr").classList.add("hidden");


    let firstName = document.getElementById("fname").value
    let lastName = document.getElementById("lname").value
    let Email = document.getElementById("email").value
    let Password = document.getElementById("pass").value
    let Password2 = document.getElementById("pass2").value
    let Address = document.getElementById("address").value
    let Username = document.getElementById("username").value


    if (firstName == "") {
      document.getElementById("dyserr").classList.toggle("hidden");
      setError('First name is required')
    } else if (lastName == "") {
      document.getElementById("dyserr").classList.toggle("hidden");
      setError('Last name is required')
    }
    else if (Email == "") {
      document.getElementById("dyserr").classList.toggle("hidden");
      setError('Email is required')
    }
    else if (Username == "") {
      document.getElementById("dyserr").classList.toggle("hidden");
      setError('Username is required')
    }

    else if (Address == "") {
      document.getElementById("dyserr").classList.toggle("hidden");
      setError('Address is required')
    }

    else if (Password == "") {
      document.getElementById("dyserr").classList.toggle("hidden");
      setError('Password is required')

    } else if (Password2 == "") {
      document.getElementById("dyserr").classList.toggle("hidden");
      setError('Please re-enter the password')
    }
    else if (Password != Password2) {
      document.getElementById("dyserr").classList.toggle("hidden");
      setError('You re-enterd wrong password')
    }
    else {
      if (users.includes(Username)) {
        document.getElementById("dyserr").classList.toggle("hidden");
        setError('This username already exiest')
      }
      else {
        isLoading(true)


        
        document.getElementById("dyserr").classList.add("hidden");



        var j = [{
          "firstname": firstName,
          "lastname": lastName,
          "email": Email,
          "username": Username,
          "pass": Password2,
          "address": Address
        }]

        const res = await fetch(`${API_URL}/api/adduser`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(j)


        })
        isLoading(false)
        const data = true
        setSharedValues({ value1: data, value2: Username })
        router.push({ pathname: '/' })

      }


    }


  }

  function lod(){
  Loading?setSup(<svg aria-hidden="true" class="w-8 h-8 mx-auto my-auto text-gray-200 animate-spin dark:text-white fill-black" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor" /><path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill" /></svg>): setSup('Sign up');
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

            <div id="dyserr" className="m-2 hidden opacity-70" role="alert">
              <div class="bg-red-500 text-white font-bold rounded-t px-4 py-1">
                Wrong Input
              </div>
              <div class="border border-t-0 border-red-400 rounded-b bg-red-100 px-4 py-2 text-red-700">
                <p>{Error}</p>
              </div>
            </div>

            <input id="fname" type="text" placeholder="First Name" className=" outline-none   rounded-sm border-b-2  mt-5 border-black" />


            <input id="lname" type="text" placeholder="Lastname" className=" outline-none rounded-sm mt-5 border-b-2 border-black" />


            <input id="email" type="email" placeholder="Email" className=" outline-none  rounded-sm mt-5 border-b-2 border-black" />
            <label id="emailwrn" className=" text-sm absolute hidden top-60 text-red-700 left-24">*email required</label>

            <input id="username" type="text" placeholder="Enter Username" className="  outline-none  rounded-sm mt-5 border-b-2 border-black" />


            <input id="pass" type="password" placeholder="Password" className=" outline-none  rounded-sm mt-5 border-b-2 border-black" />

            <input id="pass2" type="password" placeholder="Re-enter Password" className=" outline-none  rounded-sm mt-5 border-b-2 border-black" />

            <input id="address" type="text" placeholder="Address" className="  outline-none  rounded-sm mt-5 border-b-2 border-black" />


            <button onClick={() => get({ users, router })} className="bg-black p-2 hover:scale-110 duration-200 text-white mb-2 text-md rounded-xl mt-10  px-2">{Sup}</button>
            <label className="text-sm text-gray-400">alrady have account?</label>
            <Link href={"/login"}>
              <button className="underline hover:scale-110 duration-200 rounded-xl text-sm p-2  px-2">Log in</button>
            </Link>

          </div>



        </div>
      </div>
    </>
  )
}

export default Signup;


export async function getServerSideProps(context) {
  if (!mongoose.connections[0].readyState) {
    await mongoose.connect(process.env.Mongodb_uri)
  }
  let users = await user.distinct("username")

  return {
    props: { users: JSON.parse(JSON.stringify(users)) }
  }
}
