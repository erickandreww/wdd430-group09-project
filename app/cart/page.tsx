import { Metadata } from "next";
import { CartProducts } from "../ui/cart/cart-products";
import { getUserCart, getProductById } from "@/app/lib/data";
import { Cart, ProductsInfo } from "@/app/lib/definitions";
import { auth } from "@/auth";
import PurchaseOrder from "../ui/cart/PurchaseOrder";

export const metadata: Metadata = {
  title: 'Cart'
}

export default async function Page() {

  let user_id = ''
  const session = await auth()
  user_id = session? session?.id : ""

  const data: Cart[] = await getUserCart(user_id);
  
  if (!data || data.length === 0) {
    return <p>No products in the Cart</p>;
  }

  const products: ProductsInfo[] = (
    await Promise.all(data.map(async (item) => await getProductById(item.product_id)))
  ).filter((product): product is ProductsInfo => product !== undefined); 
  

  return (
    <div>
      <h2>Cart Products</h2>
      <div>
        <CartProducts products={products} user_id={user_id} cart={data}/>
        <PurchaseOrder user_id={user_id} />
      </div>
      <div>

      </div>
    </div>
  )
}