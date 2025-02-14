'use server';

import { Product, productEditSchema } from "../_schemas/productEdit";
import { alterProductById } from "../lib/data";
import { ProductFormState} from "../lib/product";
import { convertZodErrors } from "../utils/forms";

export const formHandlerActionEdit = async (product: Product):Promise<ProductFormState<Product>>=>{
    const validated = productEditSchema.safeParse(product);

    if (!validated.success) {
        const errors = convertZodErrors(validated.error)
        return {errors}
    }else{
        console.log(validated.data)
        const{product_name, product_image, product_price, product_description, product_quantity, product_id} = validated.data
        await alterProductById(product_name, product_image, product_price, product_description, product_quantity, product_id)
        return{successMsg: 'Product added successfully', errors:{}}
    }
}