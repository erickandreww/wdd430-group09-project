'use client'

import Image from "next/image";
import { addProductToCart } from "@/app/lib/data";
import { ProductsInfo, ProductToCart } from "@/app/lib/definitions";
import Button from "../button";

function getOptions(quantity:number) {
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

  const options = getOptions(product.product_quantity)

  const onSubmit = async (product: ProductToCart) => { 
    console.log(product)
  }

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
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="grid grid-rows-2">
          <label htmlFor="quantity-selected" className="">Choose a Quantity</label>
          <select key="quantity" id="quantity" className="w-12">
            {options.map(option => {
              return option
            })}
          </select>
        </div>
        <Button type="submit"
          className="flex h-7 items-center bg-slate-400 px-3 text-sm font-medium text-black transition-colors hover:bg-blue-400 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-500 active:bg-blue-600 aria-disabled:cursor-not-allowed aria-disabled:opacity-50" 
          >Add to Cart</Button>
      </form>
    </div>
  )
}