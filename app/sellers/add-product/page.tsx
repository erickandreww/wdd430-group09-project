import CreateForm from "@/app/ui/sellers/CreateForm";
import { auth } from "@/auth";
import { Metadata } from "next";
import { redirect } from "next/navigation";

export const metadata: Metadata = {
  title: 'Create Product'
}

export default async function Page() {
    const session = await auth()
    if(!session) redirect("/login")
  return <>
    <p>Add a product</p>
    <CreateForm userId={session? session.id : ""}/>
  </>
}