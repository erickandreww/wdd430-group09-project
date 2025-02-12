import CreateForm from "@/app/ui/sellers/CreateForm";
import { auth } from "@/auth";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: 'Create Product'
}

export default async function Page() {
    const session = await auth()
    const userId = session.id;
  return <>
    <p>Sellers Page</p>
    <CreateForm userId={userId}/>
  </>
}