
import Image from "next/image";
import Link from "next/link";
import { HiTrash } from "react-icons/hi2";
import { ProductsInfo } from "@/app/lib/definitions";


export function CartProducts({products, user_id}: {products: ProductsInfo[], user_id: string}) {

  console.log(user_id);

  return (
    <form action="">
      <div className="flex flex-col gap-4">
        {products.map((product) => (
          <div
            key={product.product_id}
            className="border rounded-lg overflow-hidden shadow-lg border-color_three bg-color_four flex 
              w-full sm:w-[400px] md:w-[480px] lg:w-[580px] 
              h-[140px] sm:h-[165px] md:h-[180px] lg:h-[210px] relative"
          >
            <Link href={`products/${product.product_id}`} className="flex-shrink-0">
              <div
                className="border-4 border-color_three overflow-hidden 
                  w-[130px] h-[140px] sm:w-[160px] sm:h-[165px] 
                  md:w-[180px] md:h-[180px] lg:w-[200px] lg:h-[210px]"
              >
                <Image
                  src={product.product_image}
                  alt={product.product_name}
                  width={200} // Max width for large screens
                  height={210} // Max height for large screens
                  className="w-full h-full object-cover"
                />
              </div>
            </Link>
            <div className="flex flex-col justify-center flex-grow px-4">
              <h4 className="text-base sm:text-lg md:text-xl font-semibold text-color_three">
                {product.product_name}
              </h4>
              <p className="text-sm sm:text-lg md:text-xl font-bold mt-1 text-color_three">
                R$ {product.product_price}
              </p>
            </div>
            <button
              type="submit"
              className="absolute bottom-2 sm:bottom-3 right-2 sm:right-3 bg-red-500 text-white p-2 rounded-full 
                hover:bg-red-600 transition-all"
            >
              <HiTrash className="w-4 h-4 sm:w-5 sm:h-5" />
            </button>
          </div>
        ))}
      </div>
    </form>
  )
}