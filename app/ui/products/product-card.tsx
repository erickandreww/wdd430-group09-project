import Image from "next/image";
import Link from "next/link";
import { fetchProducts } from "@/app/lib/data";

export default async function ProductCards({
  query,
  currentPage,
}: {
  query: string;
  currentPage: number;
}) {
  const products = await fetchProducts(query, currentPage);

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
      {products.map(product => (
        <Link key={product.product_id} href={`products/${product.product_id}`}>
          <div className="border rounded-lg overflow-hidden shadow-lg">
            <Image 
              src={`/products/${product.product_image}`}
              alt={product.product_name} 
              width={300} 
              height={300} 
              className="w-full h-48 object-cover"
            />
            <div className="p-4">
              <h2 className="text-lg font-semibold">{product.product_name}</h2>
              <p className="text-sm text-gray-600">{product.product_description}</p>
              <p className="text-xl font-bold mt-2">{product.product_price}</p>
            </div>
          </div>
        </Link>
      ))}
    </div>
  )
}