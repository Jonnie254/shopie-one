import { Request, Response } from "express";
import { userService } from "../services/user.service";
import { UserDetails } from "../models/user.interface";

let UserService = new userService();

export class UserController {
  async registerUser(req: Request, res: Response) {
    try {
      let result = await UserService.registerUser(req.body);

      return res.status(201).json(result);
    } catch (error) {
      return res.json({
        error
      });
    }
  }

  async getAllUsers(req: Request, res: Response){
    try{
      let result = await UserService.fetchAllUsers()

      return res.status(201).json(result)
    }catch (error) {
      return res.json({
        error
      });
    }
  }

  async getSingleUser(req: Request, res: Response) {
    try {
      let { user_id } = req.params;
      let response = await UserService.fetchSingleUser(user_id);
      console.log(response);

      return res.status(201).json(response);
    } catch (error) {
      return res.json({
        error: "Error fetching user",
      });
    }
  }

  async switchRoles(req: Request, res: Response) {
    try {
      let { user_id } = req.body;
      let response = await UserService.switchRoles(user_id);
      return res.status(200).json(response);
    } catch (error) {
      return res.json({
        error: "error switching roles",
      });
    }
  }

  async updateUser(req: Request, res: Response) {
    try {
      let email = req.params.email;
      let { password } = req.body;

      let user = {
        email: email,
        password,
      };

      let response = await UserService.updateUserDetails(email, password);
      return res.status(200).json(response);
    } catch (error) {
      return res.json({
        error: error,
      });
    }
  }

  async updateUserCredentials(req: Request, res: Response){

    try {
        let user_id = req.params.user_id
        let {username, email, password} = req.body

        let user= {
            user_id: user_id,
            username,
            email,
            password
        }
        let response = await UserService.updateUserCredentials(user)
        return res.status(200).json(response)
    } catch (error) {
        return res.json({
            error:error
        })
    }
}

async deleteUser(req: Request, res: Response){
  try {
    let {user_id} = req.params

    let response = await UserService.deleteUser(user_id)
    return res.status(200).json(response);

  } catch (error) {
      return res.json({
        error: 'Error deleting user'
    })
  }
}
}
