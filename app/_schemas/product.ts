import { z } from "zod";

export const productSchema = z.object({
    product_name: z.string({message: "Name is required"}).min(4, "Product name should have at least 4 characters"),
    product_image: z.string({message: "Product image is required"}).url("Product image must be a valid URL"),
    product_price: z.coerce.number({message: "Product price is required"}).min(1, "Price has to be higher from 1$"),
    product_quantity: z.coerce.number({message: "Product quantity is required"}).min(1, "Price quantity has to be at least 1").max(50, "Price quantity should be least than or equal 50"),
    id: z.string()
})

export type Product = z.infer<typeof productSchema>