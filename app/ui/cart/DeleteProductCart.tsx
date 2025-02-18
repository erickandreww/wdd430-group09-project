import { deleteProductCart, updateProductQuantity } from "@/app/lib/data"
import { Cart, ProductInformation} from "@/app/lib/definitions"
import { redirect } from "next/navigation"
import { HiTrash } from "react-icons/hi2";


export default function DeleteProduct({product, cart}: {product: ProductInformation, cart: Cart[]}){
    return(
        <>
        <form action={async()=>{
            "use server"
            for (let z = 0; z < cart.length; z++) {
                if (cart[z].product_id === product.product_id) {
                    await updateProductQuantity(Number(product.product_quantity + cart[z].quantity), product.product_id)
                    await deleteProductCart(cart[z].cart_id) 
                }  
            }  
            redirect("/cart")
        }} className="absolute bottom-2 right-2 bg-red-500 text-white p-2 rounded-full hover:bg-red-600 transition-all">
            <button type="submit"><HiTrash className="w-4 h-4 sm:w-5 sm:h-5" /></button>
        </form>
        </>
    )
}