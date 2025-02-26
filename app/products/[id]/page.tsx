import type { Metadata } from 'next'
import { getProductById, getProductName } from "@/app/lib/data";
import { notFound } from "next/navigation";
import AddToCart from "@/app/ui/products/add-to-cart";
import GetProduct from "@/app/ui/products/product";
import ProductReview from "@/app/ui/products/reviews";
import ReviewsForm from "@/app/ui/products/add-review";
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
  user_id = session? session?.id : ""

  return (
    <div className="max-w-6xl mx-auto p-6 space-y-8">
        <div className="">
          <GetProduct product={product} />
        </div>
        <div className='grid grid-cols-3'>
          <div className='col-start-2 w-full'>
          <AddToCart 
            product_id={product.product_id} 
            user_id={user_id} 
            product_quantity={product.product_quantity}
          />
          </div>
        </div>
      <div className="bg-color_three p-4 rounded-lg shadow">
        <ReviewsForm id={user_id} product_id={id} user={{
          name: session?.user?.name ?? "Anonymous",
          email: session?.user?.email ?? "",
          image: session?.user?.image ?? "/default-avatar.png"
        }}/>
      </div>

      <ProductReview id={id} />
    </div>
  )
}