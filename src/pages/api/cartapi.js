import user from '../../models/user'
import connectdb from "../../connection/connection";

const handler = async (req, res) => {
    try {
       

        for (let i = 0; i < req.body.length; i++) {
            
    

           

            if(req.method == 'POST'){
                const { username, cart} = req.body[i];
                let existingcart = await user.findOne({"username": username});
                existingcart.cart = existingcart.cart.concat(cart);
                await existingcart.save();
            }
            else if(req.method == 'DELETE'){
                for (let i = 0; i< req.body.length; i++) {
                  const {username, id} = req.body[i];
                  let existingcart = await user.findOne({"username": username})
                  await existingcart.cart[id].deleteOne();
                  await existingcart.save();
                   
                }
            }
            

            

            
        }

        let users = await user.find();
        res.status(200).json({ users });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
}

export default connectdb(handler);