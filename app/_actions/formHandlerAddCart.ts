'use server';

import { Cart, CartSchema } from "../_schemas/addCart";
import { addProductToCart, updateProductQuantity } from "../lib/data";
import { CartFormState} from "../lib/review";
import { convertZodErrors } from "../utils/forms";

export const formHandlerActionCart = async (cart: Cart, product_quantity:number):Promise<CartFormState<Cart>>=>{
    const validated = CartSchema.safeParse(cart);

    if (!validated.success) {
        const errors = convertZodErrors(validated.error)
        return {errors}
    }else{
        const {quantity, product_id, user_id} = validated.data
        const addProduct = await addProductToCart(Number(quantity), user_id, product_id)
        await updateProductQuantity(product_quantity - Number(quantity), product_id)
        if (addProduct) {
            
        }
        return{successMsg: 'Product added successfully', errors:{}}
    }
}