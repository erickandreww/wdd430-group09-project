'use server';

import { productSchema } from "../_schemas/product";
import { ProductFormState } from "../lib/product";
import { convertZodErrors } from "../utils/forms";

export const formHandlerAction = async (formData: FormData):Promise<ProductFormState<undefined>>=>{
    const unvalidatedProduct = {
        product_name: formData.get("product_name"),
        product_image: formData.get("product_image"),
        product_price: formData.get("product_price"),
        product_quantity: formData.get("product_quantity"),
        id: formData.get("id")
    }

    const validated = productSchema.safeParse(unvalidatedProduct);

    if (!validated.success) {
        const errors = convertZodErrors(validated.error)
        return {errors}
    }else{
        console.log(validated.data)
        return{successMsg: 'Product added successfully', errors: {}}
    }
}