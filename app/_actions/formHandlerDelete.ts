'use server';

import { Product } from "../_schemas/productDelete";
import { deleteProduct } from "../lib/data";
import { ProductFormState} from "../lib/product";


export const formHandlerActionDelete = async (product: Product):Promise<ProductFormState<Product>>=>{
   
        const product_id = product.product_id
        await deleteProduct(product_id)
        return{successMsg: 'Product deleted successfully', errors:{}}
  
}