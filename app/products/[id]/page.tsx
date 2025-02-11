import type { Metadata } from 'next'
import { getProductById, GetUserIdByEmail, getProductName } from "@/app/lib/data";
import { notFound } from "next/navigation";
import GetProduct from "@/app/ui/products/product";
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

  let user_id
  const session = await auth()
  const email = session?.user?.email
  if (!email) {
    user_id = await GetUserIdByEmail(email);
  } else {
    user_id = "not logged";
  }
  
  if (!product || product.product_quantity === 0) {
    console.log("this product is not avaliable");
  }
  console.log("1");
  return (
    <div>
      <GetProduct product={product} user_id={user_id}/>
    </div>
  )
}