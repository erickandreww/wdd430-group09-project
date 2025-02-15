'use client'

import Image from "next/image"
import { useState } from "react"
import { SessionInfo } from "@/app/lib/definitions"

export default function ReviewsForm({id, product_id, user}: {id:string, product_id: string, user: SessionInfo}) {
  const [input, setInput] = useState({message: "", rating: 0});
  
  return (
    <form action="">
      <div>
        <div>
          <Image 
          src={user.image}
          alt={`${user.name} image`}
          width={80} 
          height={80} 
          ></Image>
          <h4>{user.name}</h4>
        </div>
        <div>
          <select name="rating" id="rating">
            <option value="">Select a rating</option>
            <option key="5" value="5">Excellent</option>
            <option key="4" value="4">Very Good</option>
            <option key="3" value="3">Average</option>
            <option key="2" value="2">Poor</option>
            <option key="1" value="1">Terrible</option>
          </select>
        </div>
        <div>
          <label htmlFor="">
            <textarea 
              name="review_text" 
              id="review_text"
              rows={5}
              cols={60}
              placeholder="Enter your review..."
              value={input.message}
              onChange={(e) => {
                setInput({ ...input, message: e.target.value.substring(0, 250) });
              }}
            />
          </label>
        </div>
        <div>
        <input hidden id="product_id" name="product_id" defaultValue={product_id} ></input>
        <input hidden id="user_id" name="user_id" defaultValue={id} ></input>
        </div>
      </div>

    </form>
  )
}