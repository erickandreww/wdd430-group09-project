
import Image from "next/image";
import Link from "next/link";
import { formatCurrency } from "@/app/lib/utils";
import { Cart, CartProductInfo } from "@/app/lib/definitions";
import DeleteProduct from "./DeleteProductCart";


export function CartProducts({products, user_id, cart}: {products: CartProductInfo[], user_id: string, cart:Cart[]}) {

  console.log(user_id);

  return (
    <div>
      <div className="flex flex-col gap-4">
        {products.map((product) => (
          <div
            key={product.product_id}
            className="border rounded-lg overflow-hidden shadow-lg border-color_three bg-color_four flex w-full p-4 relative"
          >
            <Link href={`products/${product.product_id}`} className="flex-shrink-0">
              <div className="border-4 border-color_three overflow-hidden w-[120px] h-[120px]">
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
              <h4 className="text-lg font-semibold text-color_three">{product.product_name}</h4>
              <p className="text-base font-bold mt-1 text-color_three">{formatCurrency(product.product_price)}</p>
              <p className="text-base font-bold mt-1 text-color_three"> Quantity: {product.quantity}</p>
            </div>
            <DeleteProduct product={product} cart={cart}/>
          </div>
        ))}
      </div>
    </div>
  )
}