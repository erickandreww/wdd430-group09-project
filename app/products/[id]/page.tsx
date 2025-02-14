import type { Metadata } from 'next'
import { getProductById, GetUserIdByEmail, getProductName } from "@/app/lib/data";
import { notFound } from "next/navigation";
import GetProductForm from "@/app/ui/products/products-form";
import ProductReview from '@/app/ui/reviews';
import { auth } from "@/auth";


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

  const session = await auth()
  const email = session?.user?.email
  const user_id = await GetUserIdByEmail(email);
  
  return (
    <div>
      <div>
        <ProductReview id={id}/>
        <GetProductForm product={product} user_id={user_id}/>
      </div>
      <div>
        <ProductReview id={id}/>
      </div>
    </div>
  )
}