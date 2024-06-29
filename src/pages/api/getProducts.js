import product from "../../models/product"
import connectdb from "../../connection/connection"

 const handler = async (req,res)=> {
    const {id} = req.body[0]
    let prod = await product.findById(id)
    let products = [prod]

    res.status(200).json({products})
}
export default connectdb(handler)