
import Arrow from '../../public/send.png'
import { useRouter } from 'next/router'
import AppContext from '../context/AppContext';
import { useContext } from 'react';





const Review = ({dataget}) => {
    console.log(dataget)
    const API_URL = process.env.NEXT_PUBLIC_API_URL;
    const router = useRouter()
    const { sharedValues } = useContext(AppContext)
    const productid = router.query;
    // let dataget;
    // async function get(){
        
    //     const as = await fetch(`${API_URL}/api/getProducts`,{
    //         method: 'GET'
            
    //     })
    //     dataget =  await  as.json()
        
    // }
    

    async function send(){
        const dataget = document.getElementById("usertext").value
        const fulldataget = [
            {
                "_id": productid.id,
                "reviews": [
                    { "key": sharedValues.value2, "value": dataget }
                ]
            }
        ]
        await fetch(`${API_URL}/api/addreview`,{
            method : 'POST',
            headers : {
                'Content-Type': 'application/json'
            },
            body : JSON.stringify(fulldataget)
            
        })
        vanish()
        router.replace(router.asPath);
    }
    function vanish(){
        document.getElementById("usertext").value = "";
    }
    // let obj
    // dataget.products.forEach(element => {
    //     if(element._id == productid.id){
    //         obj = element.reviews
    //     }
    // });
    


    return (

        <div className=' max-h-screen  px-4 border-2 bg-gray-100 overflow-auto'>
            <label className=' text-2xl rfedin font-bold p-2'>Reviews</label>
            <div className=' relative flex dwfedin flex-col items-center p-2  h-auto md:m-10 '>
                <textarea id='usertext' type="url" className='w-full p-2 pr-9 border-2 border-black text-black overflow-y-hidden min-h-20 max-h-20 rounded-lg' placeholder='Enter your feeback of the product' />
                <img src={Arrow.src} onClick={sharedValues.value1?send:() => router.push('/signup')} className=' h-7  absolute right-4 md:right-5 top-8' alt="" />
            </div>

            {dataget.toReversed().map((item) =>{
            return <div key={item._id} className='self-start h-auto text-wrap  p-2 dwfedin max-w-fit border-gray-400 border-2 shadow-2xl  my-4 rounded-2xl bg-white'>
                    <label className=' font-medium'>{item.key}</label>
                    <p className='self-start text-sm break-words '>{item.value}</p>
                </div> 
            })}
        </div>
    )
}


export default Review;






