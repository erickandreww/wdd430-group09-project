import type { Metadata } from 'next'
import { getProductById, GetUserIdByEmail, getProductName } from "@/app/lib/data";
import { notFound } from "next/navigation";
// import GetProductForm from "@/app/ui/products/products-form";
import GetProduct from '@/app/ui/products/product';
import ProductReview from '@/app/ui/products/reviews';
import ReviewsForm from '@/app/ui/products/add-review';
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

  let user_id = ''
  const session = await auth()
  const email = session?.user?.email
  if (!email === null) {
    user_id = await GetUserIdByEmail(email);
  }
  
  
  return (
    <div>
      <div>
        <GetProduct product={product}/>
        {/* <GetProductForm product={product} user_id={user_id}/> */}
      </div>
      <div>
        <ReviewsForm id={user_id} product_id={id} user={session.user}/>
      </div>
      <div>
        <ProductReview id={id}/>
      </div>
    </div>
  )
}