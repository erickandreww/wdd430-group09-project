import { auth } from "@/auth";
import { Metadata } from "next";
import { redirect } from "next/navigation";
import UserProducts from "../ui/products/UserProducts";
import CreateButton from "../ui/sellers/CreateButton";
import { getUserById } from "../lib/data";

export const metadata: Metadata = {
  title: 'Create Product'
}

export default async function Page() {
    const session = await auth()
    if (!session) redirect("/login")
    const userInformation = await getUserById(Number(session?.id))
    if (userInformation?.status === "client") redirect(`/user/${session.id}`)
  return(
    <div className="container mx-auto p-4">
      <UserProducts user_id={session? Number(session.id) : 0}/>
      <h1></h1>
      <CreateButton />
    </div>
  )    
}