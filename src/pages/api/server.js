import mongoose from 'mongoose';
import product from '../../models/product'

export async function getServerSideProps(context) {
    
    const url = context.req.url
    let url_arr = url.split("=")
    let id = url_arr[1]
    if (!mongoose.connections[0].readyState) {
        await mongoose.connect(process.env.Mongodb_uri)
    }
    let data = await product.findById(id)



    return {
        props: { data: JSON.parse(JSON.stringify(data)) }
    }

}