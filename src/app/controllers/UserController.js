import {v4} from 'uuid'
import * as YUP from "yup"

import User from "../models/User"

class UserController {
  async store(request, response){
    const schema = YUP.object().shape({
      name : YUP.string().required(),
      email: YUP.string().email().required(),
      password: YUP.string().required().min(6),
      admin: YUP.boolean(),
    })

  // if (!(await schema.isValid(request.body))){
  //     return response.status(400).json({error :'make sure your data is correct'})}


   try { await schema.validateSync(request.body,{abortEarly: false }) 
   } catch (err){
     return response.status(400).json({error: err.errors})
   }

    const {name, email, password, admin } = request.body 

    const userExists = await User.findOne({
      where: {email}, 
    })
    
    if (userExists){
      return response.status(400).json({error: 'User already exists'})
    }


     const user = await User.create({
        id: v4(),
        name,
        email,
        password,
        admin,
     }) 

     return response.status(201).json({id: user.id , name, email, admin})
    }
}
 

export default new UserController()
