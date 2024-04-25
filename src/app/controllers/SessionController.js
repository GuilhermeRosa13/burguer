import * as YUP from "yup"
import User from "../models/User"




class SessionController {
    async store(request, response) {
        const schema = YUP.object().shape({
            email: YUP.string().email().required(),
            password: YUP.string().required(),
        })

       const userEmailorPasswordIncorrect = () => {
        return response.status(401).json({error:'Make sure your password or email  are correct'})
       }


        if(!(await schema.isValid(request.body))){
            userEmailorPasswordIncorrect()
        }

        const {email, password} = request.body
        
        const user = await User.findOne({
            where:{email},
        })  

        if (!user) userEmailorPasswordIncorrect()

        if (!(await user.checkPassword(password))) userEmailorPasswordIncorrect()

        return response.json({
            id: user.id,
            email,
            name: user.name,
            admin: user.admin,
        })
    }
}


export default new SessionController()  