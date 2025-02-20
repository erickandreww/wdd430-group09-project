'use server';

import { Product, productSchema } from "../_schemas/product";
import { createNewProduct } from "../lib/data";
import { ProductFormState} from "../lib/product";
import { convertZodErrors } from "../utils/forms";

export const formHandlerAction = async (product: Product):Promise<ProductFormState<Product>>=>{
    const validated = productSchema.safeParse(product);

    if (!validated.success) {
        const errors = convertZodErrors(validated.error)
        return {errors}
    }else{
        const{product_name, product_image, product_price, product_description, product_quantity, user_id} = validated.data
        await createNewProduct(product_name, product_image, product_price, product_description, product_quantity, user_id)
        return{successMsg: 'Product added successfully', errors:{}}
    }
}