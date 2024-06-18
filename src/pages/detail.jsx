
import Image from 'next/image'
import { useRouter } from 'next/router'
import Review from '../components/review'




export default function detail({ data }) {
    const router = useRouter()
    const productid = router.query
    console.log(productid)
    let img, name, price, desc

    let data2 = data.products
    data2.forEach(element => {
        if (element._id == productid.id) {
            img = element.img
            name = element.name
            price = element.price
            desc = element.desc

        }
    })

    return (
        <div className=' overflow-hidden '>
            <div className='flex flex-col md:flex-row h-auto md:h-4/5 md:w-screen  my-3 '>
                <div className='flex  items-center justify-center h-auto md:h-4/5 md:w-2/5'><Image className='md:h-4/5 md:w-3/5  size-full p-1' quality={100} src={img} width={500} height={500} alt="" /></div>
                <div className=' flex flex-col py-10  md:h-4/5 md:w-3/5'>
                    <label className=' p-2 text-5xl font-bold'>{name}</label>
                    <label className=' p-2 pt-5 text-2xl font-medium '>Price : ₹{price}</label>
                    <p className=' p-2 pt-5 text-xl '>{desc}</p>
                    <div className='pt-10 px-2'>
                        <button className="bg-black hover:scale-110 duration-200 text-white text-sm rounded-xl py-2 px-3 ">Buy now</button>
                        <button className="bg-black hover:scale-110 duration-200 text-white text-sm rounded-xl ml-5 py-2 px-3">Add to cart</button>

                    </div>
                </div>

            </div>
            <Review  dataget = {data}  />

        
        </div>
    )
}



export async function getServerSideProps(context) {
    const product = await fetch('http://localhost:3000/api/getProducts')
    const data = await product.json()
    return {
        props: { data }
    }
}

