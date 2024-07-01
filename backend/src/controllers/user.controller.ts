import { Request, Response } from 'express';
import { userService } from '../services/user.service';

let UserService = new userService();

export class UserController {
    async registerUser(req: Request, res: Response){
        try{
            let{ username, email, password} = req.body

            console.log(req.body)

            let result = await UserService.registerUser(req.body)

            return res.status(201).json(result)
        }catch (error){
            return res.json({
                error
            })
        }
    }

    async fetchAllUsers(req: Request, res: Response){
        try {
            let result = await UserService.getAllUsers()
            
            return res.status(201).json(result)

        } catch (error) {
            return res.json({
                error
            })
        }
    }

    async getSingleUser(req: Request, res: Response){
        try{
            let{user_id} = req.params

            let response = await UserService.fetchSingleUser(user_id)
            console.log(response);
            

            return res.status(201).json(response)
        }catch (error){
            return res.json({
                error: "Error fetching user"
            })
        }
    }

    async switchRoles(req: Request, res: Response){
        try{
            let {user_id} = req.body

            let response = await UserService.switchRoles(user_id)

            return res.status(200).json(response)
        }catch (error){
            return res.json({
                error: "error switching roles"
            })
        }
    }
}