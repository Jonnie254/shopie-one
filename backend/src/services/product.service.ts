import mssql, { pool } from 'mssql'
import { v4 } from 'uuid'
import { sqlconfig } from '../config/sql.config'
import { ProductDetails } from '../models/product.interface'
import lodash from 'lodash'

export class productService{
        
    async createProduct(product: ProductDetails){
        let pool = await mssql.connect(sqlconfig)
        let product_id = v4()

        let result = await (await pool.request()
     .input('product_id', product_id)
     .input('product_name', mssql.VarChar,product.product_name )
     .input('product_description', mssql.VarChar,product.product_description )
     .input('product_image', mssql.VarChar, product.product_image)
     .input('product_price', mssql.Float, product.product_price)
     .execute('createProduct')).rowsAffected

     if(result[0] == 1){
        return{
            message: 'Product created successfully'
        }
     }else{
        return{
            message: 'Error creating product'
        }
     }
    }

    async fetchAllProducts(){
        let pool = await mssql.connect(sqlconfig)
        let result = (await pool.query(`SELECT * FROM Products`)).recordset

        if(result.length == 0){
            return{
                message: 'No products found'
            }
        }else{
            return{
                products: result
            }
        }
    }

    async fetchSingleProducts(product_id: string){
        let pool = await mssql.connect(sqlconfig)
    }
}