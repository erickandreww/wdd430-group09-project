import Image from "next/image";
import { getProductById } from "@/app/lib/data";

export default async function GetProduct({id}: {id:string}) {
  const product = await getProductById(id);

    return (
      <div className="flex p-5">
        <Image 
        src={`/products/${product.product_image}`}
        alt={product.product_name} 
        width={400}
        height={400}></Image>
        <div>
          <h2 className="text-lg font-semibold">{product.product_name}</h2>
          <p className="text-sm text-gray-600">{product.product_description}</p>
          <p className="text-xl font-bold mt-2">{product.product_price}</p>
          <p className="text-xl font-bold mt-2">{product.product_quantity}</p>
          <p className="text-xl font-bold mt-2">{product.name}</p>
        </div>
      </div>
    )
}