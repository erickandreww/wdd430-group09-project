'use client'

import Image from "next/image"
import { formHandlerActionReview } from "@/app/_actions/formHandlerReview";
import { redirect } from "next/navigation";
import toast from "react-hot-toast";
import { Review, reviewSchema } from "@/app/_schemas/review";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { SessionInfo } from "@/app/lib/definitions";

export default function ReviewsForm({id, product_id, user}: {id:string, product_id: string, user?: SessionInfo}) {
    const {register, handleSubmit, formState:{errors, isSubmitting}}= useForm<Review>({
        resolver: zodResolver(reviewSchema),
        defaultValues:{
            review_text: "",
            product_id: `${product_id}`,
            user_id: `${id}`
        },
        mode: 'onChange'
    })

    const onSubmit = async (review: Review)=>{
        const {successMsg} = await formHandlerActionReview(review);
        if(successMsg){
            toast.success(successMsg);
            redirect(`/products/${product_id}`)
        }
    }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="border rounded-lg shadow-md p-4 bg-color_three">
      <div className="flex items-center space-x-4 mb-4">
        <Image 
          src={user?.image? user?.image : ""}
          alt={`${user?.name} image`}
          width={50} 
          height={50} 
          className="rounded-full shadow"
        />
        <h4 className="text-lg text-color_four font-semibold">{user?.name}</h4>
      </div>

      <div className="mb-4">
        <label className="block text-color_four font-medium">Rating:</label>
        <select 
          id="rating"
          className="w-full border-gray-300 rounded-md focus:ring-green-500"
          {...register('rating')}
        >
          <option value="">Select a rating</option>
          <option value="5">Excellent</option>
          <option value="4">Very Good</option>
          <option value="3">Average</option>
          <option value="2">Poor</option>
          <option value="1">Terrible</option>
        </select>
        {errors?.rating &&(
              <small className="text-red-400">{errors.rating.message}</small>
        )}
      </div>

      <div className="mb-4">
        <label className="block text-color_four font-medium">Your Review:</label>
        <textarea 
          id="review_text"
          rows={4}
          className="w-full border-gray-300 rounded-md focus:ring-green-500 p-2"
          placeholder="Enter your review..."
          {...register('review_text')}
        />
        {errors?.review_text &&(
              <small className="text-red-400">{errors.review_text.message}</small>
        )}
      </div>

      <input type="hidden" id="product_id" {...register('product_id')} />
      <input type="hidden" id="user_id" {...register('user_id')} />

      <button 
        type="submit" 
        className="bg-background text-foreground hover:bg-color_two hover:text-color_three px-4 py-2 rounded w-full"
      >
        {isSubmitting ? 'Submitting...' : 'Submit'}
      </button>
    </form>
  )
}