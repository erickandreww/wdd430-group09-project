import { productById } from "@/app/lib/data";
import DeleteProduct from "@/app/ui/sellers/DeleteProduct";
import { auth } from "@/auth";
import { Metadata } from "next";
import { redirect } from "next/navigation";

export const metadata: Metadata = {
  title: 'Delete Product'
}

export default async function Page({params}: {params: Promise<{id: string}>}){
    const product_id = (await params).id
    const productData = await productById(product_id);
    const session = await auth()
    if(!session){
      redirect("/login")
    } 
  return <>
    <p>Edit a product</p>
    <DeleteProduct productData= {productData}/>
  </>
}