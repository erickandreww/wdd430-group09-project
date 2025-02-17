import { Metadata } from "next";
import { CartProducts } from "../ui/cart/cart-products";
import { auth } from "@/auth";

export const metadata: Metadata = {
  title: 'Cart'
}

export default async function Page() {

  let user_id = ''
  const session = await auth()
  user_id = session? session?.id : ""

  return (
    <div>
      <h2>Cart Products</h2>
      <div>
        <CartProducts id={user_id}/>
      </div>
    </div>
  )
}