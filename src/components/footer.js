
// import 'tailwindcss/tailwind.css'
import gmail from '../../public/envelope.png'
import linkdin from '../../public/linkedin.png'
import git from '../../public/github.png'
import twitter from '../../public/twitter.png'
import Link from 'next/link';
import AppContext from '../context/AppContext';
import { useContext } from 'react';


const Footer = () => {
   
    const { sharedValues } = useContext(AppContext)

    return (
        <>
            <footer id="abt" className="grid bg-black p-2 h-auto grid-cols-2 text-white relative bottom-0">
                <div className=" h-full w-full space-y-4 p-2 ">
                    <label className="underline font-bold ml-10" htmlFor="ul">Direct link</label>
                    <ul className="ml-10 text-sm space-y-6">
                        
                        <li className="hover:underline"><Link href={"/"}>Home</Link></li>
                        {sharedValues.value1?
                        <div className=' space-y-6'> 
                        <li  className="hover:underline"><Link href={({pathname: '/cart'})}>Cart</Link> </li>
                        <li  className="hover:underline"><Link href={({pathname: '/profile'})}>Profile</Link> </li>
                        </div> :
                        <div className=' space-y-6'>
                        <li className="hover:underline"><Link href={"/login"}>Log in</Link> </li>
                        <li className="hover:underline"><Link href={"/signup"}>Sign up</Link></li>
                        </div>
                        }
                    </ul>
                    <span className="text-3xl absolute bottom-20 mx-auto  left-0 lg:left-80 lg:bottom-24 bg-black text-white pl-1">Innovate<span
                        className="bg-white text-3xl text-black font-bold">Tech</span></span>

                </div>
                <div className=" border-l-2 border-white h-full w-full space-y-4 p-2 ">
                    <div className="space-y-2">
                        <label className="underline font-bold ml-2" htmlFor="ul">Visit</label>

                        <div className="flex space-x-5 ml-2">
                            <Link href={'mailto:rudralangote@gmail.com'}>
                                <img  className="h-5 invert"src={gmail.src} alt="" />
                            </Link>
                            <Link href={'https://www.linkedin.com/in/rudra-langote-439366291/'}> 
                                <img className="h-5 invert" src={linkdin.src} alt="" />
                            </Link> 
                            <Link href={'https://github.com/Rudra-Langote'}>
                                <img className="h-5 invert" src={git.src} alt="" />
                            </Link>
                            <Link href={'https://x.com/Rudra_2945'}>
                                <img className="h-5 invert" src={twitter.src} alt="" />
                            </Link>
                            
                        </div>

                    </div>
                    <div>
                        <label className="font-bold underline ml-2" htmlFor="">About</label>
                        <p className="ml-2 text-sm">Welcome to InnovateTech, your premier destination htmlFor
                            cutting-edge tech products. We pride ourselves
                            on offering the latest innovations in technology, serving customers worldwide. With a commitment
                            to
                            quality and excellence, InnovateTech ensures you stay ahead in the fast-paced tech world.
                            Discover
                            the future with us today!
                        </p>

                    </div>

                </div>
            </footer>

        </>
    )
}

export default Footer
