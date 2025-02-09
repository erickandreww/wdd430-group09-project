import type { Metadata } from 'next'
import { getProductName } from "@/app/lib/data";
import { getProductById } from "@/app/lib/data";
import { notFound } from "next/navigation";
import GetProduct from "@/app/ui/products/product";


export async function generateMetadata(props: { params: Promise<{ id: string }>}): Promise<Metadata> {
  const params = await props.params; 
  const id = params.id;
  const productName = await getProductName(id);
  return {
    title: productName,
  }
}

export default async function Page(props: { params: Promise<{ id: string }>}) {
  const params = await props.params; 
  const id = params.id;
  const product = await getProductById(id); 

  if (!product) {
    notFound();
  }

  return (
    <div>
      <GetProduct id={id}/>
    </div>
  )
}