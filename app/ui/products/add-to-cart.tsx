'use client'

// import { sendProductToCart } from "@/app/lib/data";
import Button from "../button";

function getOptions(quantity:number) {
  const options: any[] = [];

  for (let i = 0; i <= quantity; i++) {
    const opt = <option key={i} value={i}>{i}</option>
    options.push(opt)
  }

  return options;
}

export default function AddToCart({
  product_id, 
  user_id, 
  quantity, 
  }: {
    product_id: string;
    user_id: string;
    quantity: number;
  }) {

  const options = getOptions(quantity)

  return (
    <form action="">
        <div>
          <label htmlFor="quantity-selected" className="text-md mt-2">Choose a Quantity</label>
          <select 
            name="product_quantity" 
            id="quantity" 
            className="w-12"
            defaultValue=""
            aria-describedby="quantity-error"
          >
            {options.map(option => {
              return option
            })}
          </select>
        </div>
        <div>
          <input hidden id="product_id" name="product_id" defaultValue={product_id} ></input>
          <input hidden id="user_id" name="user_id" defaultValue={user_id} ></input>
        </div>
        <div>
          <Button type="submit" className="flex h-7 items-center bg-slate-400 px-3 text-sm font-medium text-black transition-colors hover:bg-blue-400 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-500 active:bg-blue-600 aria-disabled:cursor-not-allowed aria-disabled:opacity-50" >
            Add to Cart
          </Button>
        </div>
    </form>
  )
}