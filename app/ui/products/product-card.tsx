"use server"
import Image from "next/image";
import Link from "next/link";
import { ProductsInfo } from "@/app/lib/definitions";
import { fetchProducts } from "@/app/lib/data";

export default async function ProductCards({
  query,
  currentPage,
}: {
  query: string;
  currentPage: number;
}) {
  const products: ProductsInfo[] = await fetchProducts(query, currentPage);

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {products.map(product => (
        <Link key={product.product_id} href={`products/${product.product_id}`}>
        <div className="border rounded-lg overflow-hidden shadow-lg border-color_three bg-color_four flex flex-col h-full transition-transform transform hover:scale-105">
          <div className="w-full h-64 relative">
            <Image 
              src={product.product_image}
              alt={product.product_name} 
              layout="fill"
              objectFit="cover"
              className="absolute inset-0 w-full h-full"
            />
          </div>
          <div className="p-4 flex-1 text-center flex flex-col justify-between">
            <div>
              <h3 className="text-2xl font-bold text-color_three mb-3">{product.product_name}</h3>
              <p className="text-xl font-bold text-color_three">R$ {product.product_price}</p>
            </div>
          </div>
        </div>
      </Link>
      ))}
    </div>
  )
}