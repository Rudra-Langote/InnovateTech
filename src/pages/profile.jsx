import Link from "next/link"
import mongoose from "mongoose"
import user from "../models/user"
import AppContext from "../context/AppContext"
import { useContext } from "react"


const profile = ({users}) => {
    console.log(users)
    
    const { sharedValues } = useContext(AppContext)
    console.log(sharedValues)
        var firstname
        var lastname
        var email
        var username
        var add
        users.forEach(element =>{
            if(element.username == sharedValues.value2){
                firstname = element.firstname
                lastname = element.lastname
                email = element.email
                username = element.username
                add = element.address
            }
        });

        const handleDeleteAccount = () => {
            // This code runs on the client side
            if (typeof window !== 'undefined') {
              localStorage.removeItem('sharedValues');
              window.location.replace('/')
              
            }
          };

        

    
  

    return (
      <div className=" flex items-center justify-center p-4">
        <div className="flex  items-center w-3/4 h-auto my-10  rounded-md justify-center py-10   shadow-md border-2 border-gray-400">
          <div className="flex flex-col relative items-center md:border-2 md:px-10 md:w-96  bg-white rounded-lg  md:shadow-2xl border-gray-300  ">
        
            <span className=" text-3xl mt-10  bg-black text-white pl-1">Pro<span
            className="bg-white text-3xl text-black font-bold">file</span></span>
            
            <lable id="fname" type="text"    className=" outline-none   rounded-sm border-b-2  mt-10 border-black">Name: {firstname} {lastname}</lable>
            <lable id="lname" type="text"    className=" outline-none rounded-sm mt-5 border-b-2 border-black">Email: {email}</lable>
            <lable id="lname" type="text"    className=" outline-none rounded-sm mt-5 border-b-2 border-black">Username: {username}</lable>
            <lable id="lname" type="text"    className=" outline-none rounded-sm mt-5 border-b-2 border-black">Address: {add}</lable>
        
  
  
           
            <Link className="flex flex-col" href={"/"}>
                <button onClick={handleDeleteAccount} className="bg-black hover:scale-110 duration-200 text-white mb-2 text-md rounded-xl mt-10 p-1 px-2">Log out</button>
                <button   className="underline hover:scale-110 duration-200 rounded-xl text-sm p-2  px-2">Delete Account</button>
            </Link>
      
          </div>    
  
        
  
        </div>
      </div>
    )
  
}

export default profile

export async function getServerSideProps(context){

    if(!mongoose.connections[0].readyState){
        await mongoose.connect(process.env.Mongodb_uri)
    }
    
    const users = await user.find();

    return{
        props: { users: JSON.parse(JSON.stringify(users))}
    }
}
