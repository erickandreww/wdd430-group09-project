'use server';

import { Product, productSchema } from "../_schemas/product";
import { ProductFormState} from "../lib/product";
import { convertZodErrors } from "../utils/forms";

export const formHandlerAction = async (product: Product):Promise<ProductFormState<Product>>=>{
    
    

    const validated = productSchema.safeParse(product);

    if (!validated.success) {
        const errors = convertZodErrors(validated.error)

        
        return {errors}
    }else{
        console.log(validated.data)
        return{successMsg: 'Product added successfully', errors:{}}
    }
}