'use server'

import Image from "next/image";
import { getReviewsByProductId } from "../../lib/data";
import { ReviewsList } from "../../lib/definitions";

export default async function ProductReview({id}: {id:string}) {
 const reviewList: ReviewsList[] = (await getReviewsByProductId(id)) || [];
  
  return (
    <div>
      {reviewList.length > 0 ? (
        reviewList.map((review) => (
          <div key={review.product_id}>
            <h4>{review.name}</h4>
            <Image 
            src={review.image}
            alt={`${review.name} user image`}
            width={80} 
            height={80} 
              >
            </Image>
            <p>{review.product_name}</p>
            <p>{new Date(review.review_date).toLocaleDateString()}</p>
            <p>{review.rating}</p>
            <p>{review.review_text}</p>
        </div>
        )) 
      ) : (
        <p>No reviews found.</p>
      )}
    </div>
  )
}