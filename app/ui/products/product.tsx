'use client'

import Image from "next/image";
import { addProductToCart } from "@/app/lib/data";
import { ProductsInfo } from "@/app/lib/definitions";

function getQuantity(quantity:number) {
  const options: any[] = [];

  for (let i = 0; i <= quantity; i++) {
    const opt = <option key={i} value={i}>{i}</option>
    options.push(opt)
  }

  return options;
}

export default function GetProduct({
  product, 
  user_id, 
  }: {
    product:ProductsInfo;
    user_id: string;
  }) {
  const quantity = getQuantity(product.product_quantity)
  console.log("2");

  return (
    <div className="" key={product.product_id}>
      <Image 
      src={`/products/${product.product_image}`}
      alt={product.product_name} 
      width={400}
      height={400}></Image>
      <div>
        <h2 className="text-lg font-semibold">{product.product_name}</h2>
        <p className="text-sm text-gray-600">{product.product_description}</p>
        <p className="text-xl font-bold mt-2">{product.product_price}</p>
        <p className="text-xl font-bold mt-2">{product.product_name}</p>
      </div>
      <div className="grid grid-rows-2">
        <label htmlFor="quantity-selected" className="">Choose a Quantity</label>
        <select key="quantity" id="quantity" className="w-12">
          {quantity.map(option => {
            return option
          })}
        </select>
      </div>
      <button className="flex h-7 items-center bg-slate-400 px-3 text-sm font-medium text-black transition-colors hover:bg-blue-400 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-500 active:bg-blue-600 aria-disabled:cursor-not-allowed aria-disabled:opacity-50" onClick={() => {
        console.log("4");
        if (user_id === "not logged") {
          console.log("4");
          console.log("Please, Login to add to the cart")
        } else {
          console.log("3");
          addProductToCart(user_id, "1", product.product_id)
        }
      }}>Add to Cart</button>
    </div>
  )
}