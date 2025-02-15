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
    <div className="max-w-6xl mx-auto p-6 space-y-8">
      <GetProduct product={product} />
      
      <div className="bg-color_three p-4 rounded-lg shadow">
      <ReviewsForm 
        id={user_id} 
        product_id={id} 
        user={{
          name: session?.user?.name ?? "Anonymous",
          email: session?.user?.email ?? "",
          image: session?.user?.image ?? "/default-avatar.png"
        }} 
      />
      </div>
      
      <ProductReview id={id} />
    </div>
  )
}