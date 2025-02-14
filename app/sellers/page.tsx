import { auth } from "@/auth";
import { Metadata } from "next";
import { redirect } from "next/navigation";
import UserProducts from "../ui/products/UserProducts";
import CreateButton from "../ui/sellers/CreateButton";

export const metadata: Metadata = {
  title: 'Create Product'
}

export default async function Page() {
    const session = await auth()
    if (!session) redirect("/login")
  return(
    <div className="container mx-auto p-4">
      <UserProducts user_id={session? Number(session.id) : 0}/>
      <CreateButton />
    </div>
  )    
}