import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import React, { useEffect, useRef, useState } from 'react'

const Heading = () => {
  const title = ['Innovating Your Shopping Experience', 'Discover Top Tech Products', 'Find Your Next Tech Upgrade', 'Explore the Latest Gadgets'];
  const [Index, setIndex] = useState(0)
  const titrefone = useRef()
  const titreftwo = useRef()
  
  useEffect(() => {

    const interval = setInterval(() => {
      setIndex((prevIndex) => (prevIndex + 1) % title.length);
    }, 3000);

    return () => clearInterval(interval);
  }, [title.length])
  useEffect(() => {
    titrefone.current.classList.remove('text-ent')
    void titrefone.current.offsetWidth;
    titrefone.current.classList.add('text-ent')

  }, [Index])

  useGSAP(() => {
    const tl = gsap.timeline()

    tl.from(titrefone.current, {
      y:-500,
      duration: 1.5,
      ease: "bounce.out"

    })
    tl.from(titreftwo.current, {
      x:-200,
      opacity:0,
      duration: 1,
      delay:0.2,
      ease: "elastic.out(1.5,0.3)",

    })
    


  })
  return (

    <>
    
      <span ref={titrefone} className=' text-[30px] md:text-[50px] text-ent'>{title[Index]}</span><span ref={titreftwo}  className=' text-[30px] md:text-[50px] font-bold'> at TechShop</span>

    </>
    
  )
}

export default Heading
