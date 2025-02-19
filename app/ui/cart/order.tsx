import Image from "next/image";
import { formatCurrency } from "@/app/lib/utils";
import { CartProductInfo } from "@/app/lib/definitions";
import PurchaseOrder from "./PurchaseOrder";

export function OrderCart({ products, user_id }: { products: CartProductInfo[], user_id: string }) {
  console.log(user_id);

  const total = products.reduce((sum, product) => sum + Number(product.product_price * product.quantity), 0);

  return (
    <div className="flex justify-center">
      <div className="border rounded-lg overflow-hidden shadow-lg border-color_three bg-color_four p-4 w-full flex flex-col items-center">
        {products.map((product) => (
          <div key={product.product_id} className="flex flex-col items-center space-y-2 mb-4">
            <div className="border-4 border-color_three w-[50px] h-[50px]">
              <Image
                src={product.product_image}
                alt={product.product_name}
                width={50}
                height={50}
                className="w-full h-full object-cover"
              />
            </div>
            <p className="text-sm font-semibold text-color_three text-center">{formatCurrency(product.product_price * product.quantity)}</p>
          </div>
        ))}
        <h4 className="text-lg font-bold text-color_three mt-4 text-center">Total: {formatCurrency(total)}</h4>
        <PurchaseOrder user_id={user_id} />
      </div>
    </div>
  );
}