import React  from 'react'
import Link from 'next/link';
import Image from 'next/image';

const Card = ({ key, id, img, name, price }) => {

    return (
        <>
            <Link key={key} prefetch={true} href={{ pathname: '/detail', query: { id: `${id}` } }}> <div className=" hover:shadow-2xl hover:scale-105 duration-300 w-36 min-w-40 h-40 relative flex flex-col items-center">
                <Image src={img} width={100} height={100} className="  h-28 w-28 absolute" alt="" />
                <span className="absolute bottom-6">{name}</span>
                <span className="absolute bottom-1">₹{price}</span>
            </div>
            </Link>
        </>
    )
}

export default Card
