import Link from "next/link"
import mongoose from "mongoose"
import React, { useEffect, useState } from "react"
import user from "../models/user"
import { useRouter } from 'next/router'
import { useContext } from "react"
import AppContext from "../context/AppContext"
import Head from "next/head"
import { useRef } from "react"


const Signup = ({ users }) => {
  const API_URL = process.env.NEXT_PUBLIC_API_URL;
  const { setSharedValues } = useContext(AppContext);
  const router = useRouter()
  const [Error, setError] = useState("");
  const [Loading, isLoading] = useState(false);
  const [Sup, setSup] = useState('Sign up');
  const fnameref = useRef(null);
  const lnameref = useRef(null);
  const emailref = useRef(null);
  const usernameref = useRef(null);
  const passref = useRef(null);
  const pass2ref = useRef(null);
  const addressref = useRef(null);
  const dyseref = useRef(null);
  const user = useRef([{}]);


  async function get({ users, router }) {


    dyseref.current.classList.add("hidden")





    user.current = {
      firstname: fnameref.current.value,
      lastname: lnameref.current.value,
      email: emailref.current.value,
      username: usernameref.current.value,
      pass: pass2ref.current.value,
      address: addressref.current.value
    }



    if (user.current.firstname == "") {
      dyseref.current.classList.toggle("hidden")
      fnameref.current.focus();
      setError('First name is required')
    } else if (user.current.lastname == "") {
      dyseref.current.classList.toggle("hidden")
      lnameref.current.focus();
      setError('Last name is required')
    }
    else if (user.current.email == "") {
      dyseref.current.classList.toggle("hidden")
      emailref.current.focus();
      setError('Email is required')
    }
    else if (user.current.username == "") {
      dyseref.current.classList.toggle("hidden")
      usernameref.current.focus();
      setError('Username is required')
    }



    else if (passref.current.value == "") {
      dyseref.current.classList.toggle("hidden")
      passref.current.focus();
      setError('Password is required')

    } else if (user.current.pass == "") {
      dyseref.current.classList.toggle("hidden")
      pass2ref.current.focus();
      setError('Please re-enter the password')
    }
    else if (passref.current.value != user.current.pass) {
      dyseref.current.classList.toggle("hidden")
      pass2ref.current.focus();
      setError('You re-enterd wrong password')
    }
    else if (user.current.address == "") {
      dyseref.current.classList.toggle("hidden")
      addressref.current.focus();
      setError('Address is required')
    }
    else if (users.includes(user.current.username)) {
      dyseref.current.classList.toggle("hidden")
      setError('This username already exiest')
    }
    else {
      isLoading(true)

      dyseref.current.classList.add("hidden")

      var j = [user.current]
      await fetch(`${API_URL}/api/adduser`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(j)


      })
      isLoading(false)
      const data = true
      setSharedValues({ value1: data, value2: user.current.username })
      router.push({ pathname: '/' })

    }


  }








  useEffect(() => {
    Loading ? setSup(<div class="flex p-2 gap-2">
      <div class="w-2 h-2 rounded-full animate-pulse bg-white"></div>
      <div class="w-2 h-2 rounded-full animate-pulse bg-white"></div>
      <div class="w-2 h-2 rounded-full animate-pulse bg-white"></div>
    </div>) : setSup('Sign up');
  })




  return (
    <>
      <Head>
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>Sign up</title>
      </Head>

      <div className=" flex items-center justify-center p-4">
        <div className="flex  items-center w-3/4 h-auto my-10  rounded-md justify-center py-10   shadow-md border-2 border-gray-400">
          <div className="flex flex-col relative items-center w-3/4 md:border-2 md:px-10 md:w-96  bg-white rounded-lg  md:shadow-2xl border-gray-300  ">

            <span className=" text-3xl mt-10  bg-black text-white pl-1">Sign<span
              className="bg-white text-3xl text-black font-bold">up</span></span>
            <div style={{ height: '70px' }}>
              <div ref={dyseref} className="m-2 hidden opacity-70" role="alert">
                <div className="bg-red-500 text-white font-bold rounded-t px-4 py-1">
                  Wrong Input
                </div>
                <div className="border  border-t-0 border-red-400 rounded-b bg-red-100 px-4 py-2 text-red-700">
                  <p>{Error}</p>
                </div>
              </div>
            </div>

            <input ref={fnameref} type="text" placeholder="First Name" className=" outline-none w-3/4   rounded-sm border-b-2  mt-5 border-black" />


            <input ref={lnameref} type="text" placeholder="Lastname" className=" outline-none w-3/4 rounded-sm mt-5 border-b-2 border-black" />


            <input ref={emailref} type="email" placeholder="Email" className=" outline-none w-3/4  rounded-sm mt-5 border-b-2 border-black" />


            <input ref={usernameref} type="text" placeholder="Enter Username" className="  outline-none  w-3/4 rounded-sm mt-5 border-b-2 border-black" />


            <input ref={passref} type="password" placeholder="Password" className=" outline-none w-3/4  rounded-sm mt-5 border-b-2 border-black" />

            <input ref={pass2ref} type="password" placeholder="Re-enter Password" className=" outline-none w-3/4 rounded-sm mt-5 border-b-2 border-black" />

            <input ref={addressref} type="text" placeholder="Address" className="  outline-none w-3/4  rounded-sm mt-5 border-b-2 border-black" />


            <button onClick={() => get({ users, router })} className="bg-black p-1 hover:scale-110 duration-200 text-white mb-2 text-md rounded-xl mt-10  px-2">{Sup}</button>
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
