import { z } from "zod";

export const CartSchema = z.object({
    product_id: z.string(),
    user_id: z.string({message: "You have to login"}), 
    quantity: z.string({message: "Product quantity is required"}).min(1, "Price quantity has to be at least 1")
})

export type Cart = z.infer<typeof CartSchema>