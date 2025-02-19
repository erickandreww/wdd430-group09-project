import { deleteUserCart } from "@/app/lib/data"
import { redirect } from "next/navigation"

export default function PurchaseOrder({ user_id}: { user_id: string}){
    return(
        <>
        <form action={async()=>{
            "use server"
            await deleteUserCart(user_id)
            redirect("/cart/success")
        }} className="mt-4 w-1/2 bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600 transition-colors text-center">
            <button type="submit" className="w-full">Order</button>
        </form>
        </>
    )
}