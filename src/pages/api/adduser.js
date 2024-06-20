import user from "../../models/user"
import connectdb from "../../connection/connection"

const handler = async (req, res)=>{

    if(req.method == 'DELETE'){
        const {username} = req.body;
        let existinguser = await user.findOne({"username": username})
        res.status(200).json({existinguser})
        await existinguser.deleteOne();

        await existinguser.save();

    }else{
        for(let i = 0; i < req.body.length; i++){
            let u = new user({
                firstname : req.body[i].firstname,
                lastname : req.body[i].lastname,
                email : req.body[i].email,
                username : req.body[i].username,
                pass : req.body[i].pass,
                address : req.body[i].address
            })
            await u.save()
        }
    }
   
    let users = await user.find()
    res.status(200).json({users})
}
export default connectdb(handler)