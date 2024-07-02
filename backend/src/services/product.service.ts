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
     .input('product_quantity', mssql.Int, product.product_quantity)
     .input('product_category', mssql.VarChar, product.product_category)
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
        let result =  (await pool.request()
        .input('product_id', mssql.VarChar, product_id)
        .query(`SELECT * FROM Products WHERE product_id = '${product_id}'`)).recordset

        if(!result[0].product_id){
            return{
                message: 'Product not found'
            }
        }else{
            return{
                product: result[0]
            }
        }
    }

    async updateProduct(products: ProductDetails){
        let pool = await mssql.connect(sqlconfig)
        let productExists = (await pool.request().query(`SELECT * FROM Products WHERE product_id = '${products.product_id}'`)).recordset

        if(lodash.isEmpty(productExists)){
            return{
                message: 'Product not found'
            }
        }else{
            let result = await (await pool.request()
            .input('product_id', mssql.VarChar, products.product_id)
            .input('product_name', mssql.VarChar, products.product_name)
            .input('product_description', mssql.VarChar, products.product_description)
            .input('product_image', mssql.VarChar, products.product_image)
            .input('product_price', mssql.Float, products.product_price)
            .input('product_quantity', mssql.Int, products.product_quantity)
            .input('product_category', mssql.VarChar, products.product_category)
            .execute('updateProduct')).rowsAffected
            console.log(result[0])
            if(result[0] < 1){
                return{
                    message: 'Error updating product'
                }
            }else{
                return{
                    message: 'Product updated successfully'
                }
            }

        }
    }

    async deleteProduct(product_id : string){

        try {
            let pool = await mssql.connect(sqlconfig)
            let productExists = (await pool.request()
                .input('product_id', mssql.VarChar, product_id)
                .query(`SELECT * FROM Products WHERE product_id = @product_id`)).recordset

                if(productExists.length === 0){
                    return{
                        message: 'Product not found'
                    }
                }

                await pool.request()
                .input('product_id', mssql.VarChar, product_id)
                .execute('deleteProduct')

                return{
                    message: 'Product deleted successfully'
                }
        } catch (error) {
            console.error('SQL ERROR', error)
            throw error;
        }
    }
}