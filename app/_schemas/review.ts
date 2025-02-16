import { z } from "zod";

export const reviewSchema = z.object({
    rating: z.string({message: "A rating is required"}),
    review_text: z.string({message: "Description is required"}).min(20, "description should have at least 20 characters").max(1000, "Description can have more than 1000 characters"),
    product_id: z.string(),
    user_id: z.string()
})

export type Review = z.infer<typeof reviewSchema>