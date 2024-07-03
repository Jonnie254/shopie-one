import { Request, Response } from "express";
import { productService } from "../services/product.service";

let itemService = new productService();

export class ProductController {
  async createItem(req: Request, res: Response) {
    try {
      let {
        product_name,
        product_description,
        product_image,
        product_price,
        product_quantity,
        product_category,
      } = req.body;

      let result = await itemService.createProduct(req.body);
      return res.status(201).json(result);
    } catch (error) {
      return res.json({
        error: "Error creating item",
      });
    }
  }

  async fetchAllItems(req: Request, res: Response) {
    try {
      let result = await itemService.fetchAllProducts();
      return res.status(201).json(result);
    } catch (error) {
      return res.json({
        error: "Error fetching items",
      });
    }
  }

  async fetchSingleItem(req: Request, res: Response) {
    try {
      let { product_id } = req.params;

      let result = await itemService.fetchSingleProducts(product_id);
      return res.status(201).json(result);
    } catch (error) {
      return res.json({
        error: "Error fetching item",
      });
    }
  }

  async updateItem(req: Request, res: Response) {
    try {
      let product_id = req.params.product_id;
      let {
        product_name,
        product_description,
        product_image,
        product_price,
        product_quantity,
        product_category,
      } = req.body;

      let products = {
        product_id: product_id,
        product_name,
        product_description,
        product_image,
        product_price,
        product_quantity,
        product_category,
      };
      let result = await itemService.updateProduct(products);
      return res.status(200).json(result);
    } catch (error) {
      return res.json({
        error: "Error updating item",
      });
    }
  }

  async deleteItem(req: Request, res: Response) {
    try {
      let { product_id } = req.params;

      let result = await itemService.deleteProduct(product_id);
      return res.status(201).json(result);
    } catch (error) {
      return res.json({
        error: "Error deleting item",
      });
    }
  }
}
