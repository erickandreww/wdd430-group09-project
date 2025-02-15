'use client'

import Image from "next/image"
import { useState } from "react"
import { sendReview } from "@/app/lib/data"
import { SessionInfo } from "@/app/lib/definitions"

export default function ReviewsForm({ id, product_id, user }: { id: string; product_id: string; user?: SessionInfo }) {
  const [input, setInput] = useState({ message: "", rating: "" });
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState("");
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    setSuccess(false);

    if (!input.rating || !input.message.trim()) {
      setError("Please provide both a rating and a review.");
      setLoading(false);
      return;
    }

    try {
      await sendReview(input.rating, input.message, Number(product_id), id);
      setSuccess(true);
      setInput({ message: "", rating: "" });
    } catch (err) {
      setError("Failed to submit review. Please try again.");
      console.error("Submit Error:", err);
    }

    setLoading(false);
  };

  return (
    <form onSubmit={handleSubmit} className="border rounded-lg shadow-md p-4 bg-color_three">
      <div className="flex items-center space-x-4 mb-4">
      <Image 
        src={user?.image ?? "/default-avatar.png"} 
        alt={`${user?.name ?? "Anonymous"} image`} 
        width={50} 
        height={50} 
        className="rounded-full shadow"
      />
      <h4 className="text-lg text-color_four font-semibold">{user?.name ?? "Anonymous"}</h4>
      </div>

      <div className="mb-4">
        <label className="block text-color_four font-medium">Rating:</label>
        <select 
          name="rating"
          id="rating"
          value={input.rating}
          onChange={(e) => setInput({ ...input, rating: e.target.value })}
          className="w-full border-gray-300 rounded-md focus:ring-green-500"
        >
          <option value="">Select a rating</option>
          <option value="5">Excellent</option>
          <option value="4">Very Good</option>
          <option value="3">Average</option>
          <option value="2">Poor</option>
          <option value="1">Terrible</option>
        </select>
      </div>

      <div className="mb-4">
        <label className="block text-color_four font-medium">Your Review:</label>
        <textarea 
          name="review_text" 
          id="review_text"
          rows={4}
          className="w-full border-gray-300 rounded-md focus:ring-green-500 p-2"
          placeholder="Enter your review..."
          value={input.message}
          onChange={(e) => setInput({ ...input, message: e.target.value.substring(0, 250) })}
        />
      </div>

      <input type="hidden" id="product_id" name="product_id" value={product_id} />
      <input type="hidden" id="user_id" name="user_id" value={id} />

      <button 
        type="submit" 
        className="bg-background text-foreground hover:bg-color_two hover:text-color_three px-4 py-2 rounded w-full"
        disabled={loading}
      >
        {loading ? "Submitting..." : "Submit Review"}
      </button>

      {success && <p className="text-green-500 mt-2">Review submitted successfully!</p>}
      {error && <p className="text-red-500 mt-2">{error}</p>}
    </form>
  )
}