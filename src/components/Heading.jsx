import React, { useEffect, useRef, useState } from 'react'

const Heading = () => {
    const title = ['Innovating Your Shopping Experience','Discover Top Tech Products','Find Your Next Tech Upgrade','Explore the Latest Gadgets'];
    const [Index, setIndex] = useState(0)
    const titref = useRef()
    useEffect(() => {

      const interval = setInterval(() => {
          setIndex((prevIndex) => (prevIndex + 1) % title.length);
      }, 3000);

      return () => clearInterval(interval);
  }, [title.length])
  useEffect(()=>{
    titref.current.classList.remove('text-ent')
    void titref.current.offsetWidth;
    titref.current.classList.add('text-ent')

  },[Index])
  return (
    <div className=' p-2 m-auto text font-sm text-black   w-auto text-center '>
      <span ref={titref}  className=' text-ent'>{title[Index]}</span><span className=' font-bold'> at TechShop</span>
     
        
    </div>
  )
}

export default Heading
