import { deleteUserCart } from "@/app/lib/data"
import { redirect } from "next/navigation"

export default function PurchaseOrder({ user_id}: { user_id: string}){
    return(
        <>
        <form action={async()=>{
            "use server"
            await deleteUserCart(user_id)
            redirect("/cart/success")
        }}>
            <button type="submit">Send your order</button>
        </form>
        </>
    )
}