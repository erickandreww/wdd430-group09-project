import Image from "next/image";
import { ProductsInfo } from "@/app/lib/definitions";

export default function GetProduct({
  product, 
}: {
  product: ProductsInfo;
}) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-center bg-color_five p-6 rounded-lg shadow-lg">
      <Image 
        src={`${product.product_image}`}
        alt={product.product_name} 
        width={400}
        height={400}
        className="rounded-lg mx-auto shadow-lg border border-gray-300 hover:scale-105 transition-transform duration-300"
      />
      <div className="flex flex-col justify-center text-center md:text-left space-y-4">
        <h2 className="text-3xl font-bold text-color_three">{product.product_name}</h2>
        <p className="text-lg text-foreground">{product.product_description}</p>
        <p className="text-2xl font-extrabold text-green-600">${product.product_price}</p>
        <p className="text-gray-600">Seller: {product.name}</p>
      </div>
    </div>
  );
}