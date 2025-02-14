

import { getReviewsByProductId } from "../lib/data";
import { ReviewsList } from "../lib/definitions";

export default async function ProductReview({id}: {id:string}) {
  const reviewList: any = await getReviewsByProductId(id); 
  console.log(reviewList[0].review_id)
  return (
    <div className="">
      {reviewList.map((review: ReviewsList) => {
        {console.log(review.product_id)}
        <div key={review.product_id}>
          <h4>{review.name}</h4>
          <p>{review.product_name}</p>
          <p>{review.review_date}</p>
          <p>{review.rating}</p>
          <p>{review.review_text}</p>
        </div>
      })}
    </div>
  )
}