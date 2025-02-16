'use server';

import { Review, reviewSchema } from "../_schemas/review";
import { sendReview } from "../lib/data";
import { ReviewFormState} from "../lib/review";
import { convertZodErrors } from "../utils/forms";

export const formHandlerActionReview = async (review: Review):Promise<ReviewFormState<Review>>=>{
    const validated = reviewSchema.safeParse(review);

    if (!validated.success) {
        const errors = convertZodErrors(validated.error)
        return {errors}
    }else{
        console.log(validated.data)
        const{rating, review_text, user_id, product_id} = validated.data
        await sendReview(rating, review_text, Number(product_id), user_id)
        return{successMsg: 'Product added successfully', errors:{}}
    }
}