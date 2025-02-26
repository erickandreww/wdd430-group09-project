import { Metadata } from "next";
import { getUserCart, getCartProduct } from "@/app/lib/data";
import { Cart, CartProductInfo } from "@/app/lib/definitions";
import { CartProducts } from "../ui/cart/cart-products";
import { OrderCart } from "../ui/cart/order";
import { auth } from "@/auth";

export const metadata: Metadata = {
  title: 'Cart'
}

export default async function Page() {

  const session = await auth();
  const user_id = session ? session.id : "";

  const data: Cart[] = await getUserCart(user_id);
  
  if (!data || data.length === 0) {
    return (
      <p className="text-center text-lg font-semibold text-color_three mt-6">
        No products in the Cart
      </p>
    );
  }

  const products: CartProductInfo[] = (
    await Promise.all(data.map(async (item) => await getCartProduct(item.product_id, item.quantity)))
  ).filter((product): product is CartProductInfo => product !== undefined); 
  

  return (
    <div className="container mx-auto px-4 py-6">
      <h2 className="text-2xl font-bold text-color_three mb-6 text-center md:text-left">
        Cart - {session?.user?.name} 
      </h2>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 w-full">
          <CartProducts products={products} cart={data}/>
        </div>
        <div className="lg:col-span-1 lg:sticky top-20 self-start w-full max-w-sm mx-auto">
          <OrderCart products={products} user_id={user_id} />
        </div>
      </div>
    </div>
  );
}