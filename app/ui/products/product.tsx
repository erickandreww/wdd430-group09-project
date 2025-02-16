import Image from "next/image";
import { ProductsInfo } from "@/app/lib/definitions";


export default function GetProduct({
  product, 
  }: {
    product:ProductsInfo;
  }) {


  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-2">
      <Image 
        src={`${product.product_image}`}
        alt={product.product_name} 
        width={400}
        height={400}
        className="rounded-lg mx-auto shadow-md"
      />
      <div className="mt-4 text-center">
        <h2 className="text-2xl font-semibold">{product.product_name}</h2>
        <p className="text-gray-500">{product.product_description}</p>
        <p className="text-xl font-bold text-green-600 mt-2">${product.product_price}</p>
        <p className="text-gray-500">Seller: {product.name}</p>
      </div>
    </div>
  )
}