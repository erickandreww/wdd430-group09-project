import Image from "next/image";
import { ProductsInfo } from "@/app/lib/definitions";


export default function GetProduct({
  product, 
  }: {
    product:ProductsInfo;
  }) {


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
    </div>
  )
}