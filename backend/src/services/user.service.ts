import mssql, { pool } from 'mssql'
import { v4 } from 'uuid'
import bcrypt from 'bcrypt'
import lodash from 'lodash'
import { UserDetails } from '../models/user.interface'
import { sqlconfig } from '../config/sql.config'


export class userService{

    async registerUser(user: UserDetails){
        let pool = await mssql.connect(sqlconfig)
        

        let user_id = v4()
        let hashedPassword =  bcrypt.hashSync(user.password, 6)
        console.log(hashedPassword)

        let emailExist = (await pool.query(`SELECT * FROM Users WHERE email = '${user.email}'`)).recordset
        console.log(emailExist[0])
        if(!lodash.isEmpty(emailExist)){
            return{
                error: "Email already exists"
            }
        }

        let result = (await pool.request().input('user_id', user_id).input('username', mssql.VarChar, user.username).input('email', mssql.VarChar, user.email).input('password', mssql.VarChar, hashedPassword).execute('registerUser')).rowsAffected


    if(result[0] == 1){
        return{
            message: "User registered successfully",
            user_id
        }
    }else{
        return{
            error: "User not registered"
        }
    }
    }

    async fetchSingleUser(user_id: string){
        let pool = await mssql.connect(sqlconfig);
        let user = (await pool.request().input('user_id', mssql.VarChar, user_id).query(`SELECT * FROM Users WHERE user_id = '${user_id}'`)).recordset;
        
        if(!user[0].user_id){
            return {
                error: "User not found"
            }
        }else{
            return {
                user: user[0]
            }
        }
    }

    async fetchAllUsers(){
        let pool = await mssql.connect(sqlconfig)
        let result = (await pool.request().execute('fetchAllUsers'))
        
        if(result.recordset.length == 0){
            return{
                message: "No users found"
            }
        }else{
            return{
                users: result
            }
        }
    }
    
    async switchRoles(user_id:string){
        let response = await this.fetchSingleUser(user_id)

        if(response.user.user_id){
            let pool = await mssql.connect(sqlconfig);
            let response = await(await pool.request().input('user_id', mssql.VarChar, user_id).query(`UPDATE Users SET role = 'admin' WHERE role = 'user' AND user_id = '${user_id}'`)).rowsAffected;

            console.log(user_id);
            

            if(response[0] < 1){
                return {
                    error: "Unable to changed user role"
                }
            }else{
                return {
                    message: "User role changed successfully"
                }
            }
        }else{
            return {
                error: "User not found"
            }
        }
    
    }

    
}