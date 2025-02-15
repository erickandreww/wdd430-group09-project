'use server'

import Image from "next/image";
import { getReviewsByProductId } from "../../lib/data";
import { ReviewsList } from "../../lib/definitions";

export default async function ProductReview({id}: {id:string}) {
 const reviewList: ReviewsList[] = (await getReviewsByProductId(id)) || [];
  
  return (
    <div className="bg-gray-50 p-4 rounded-lg shadow">
    {reviewList.length > 0 ? (
      reviewList.map((review) => (
        <div key={review.product_id} className="border-l-4 border-green-400 pl-4 mb-4">
          <div className="flex items-center space-x-4">
            <Image 
              src={review.image}
              alt={`${review.name} user image`}
              width={50}
              height={50}
              className="rounded-full shadow-sm"
            />
            <h4 className="text-lg font-semibold">{review.name}</h4>
          </div>
          <p className="text-sm text-foreground">{new Date(review.review_date).toLocaleDateString()}</p>
          <p className="text-yellow-500 font-bold">{'⭐'.repeat(review.rating)}</p>
          <p className="text-foreground">{review.review_text}</p>
        </div>
      ))
    ) : (
      <p className="text-foreground italic">No reviews yet. Be the first to review!</p>
    )}
  </div>
  )
}