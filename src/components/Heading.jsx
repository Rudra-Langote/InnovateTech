import React, { useEffect, useRef, useState } from 'react'

const Heading = () => {
    const title = ['Innovating Your Shopping Experience','Discover Top Tech Products at TechShop','Find Your Next Tech Upgrade at TechShop','Explore the Latest Gadgets at TechShop'];
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
    <div className=' p-2  bg-white text-center '>
      <span ref={titref}  className=' text font-sm text-black text-ent'>{title[Index]}</span>
        
    </div>
  )
}

export default Heading
