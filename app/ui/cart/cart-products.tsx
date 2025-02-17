
import Image from "next/image";
import Link from "next/link";
import { getUserCart, getProductById } from "@/app/lib/data";
import { Cart } from "@/app/lib/definitions";


export async function CartProducts({id}: {id: string}) {

  const data: Cart[] = await getUserCart(id);

  if (!data) {
    return (
      <p>No products in the Cart</p>
    )
  }

  let products: any[] = [];
  await data.map(async product => {
    let productData = await getProductById(product.product_id);

    let productInfo = 
      <Link key={product.product_id} href={`products/${product.product_id}`}>
        <div className="border rounded-lg overflow-hidden shadow-lg border-color_three bg-color_four flex w-96">
          <div className="relative min-w-[250px] w-[250px] min-h-[200px] h-[200px]">
            <Image 
              src={`${productData.product_image}`}
              alt={productData.product_name} 
              width={0} 
              height={0} 
              className="absolute inset-0 w-full h-full object-cover"
              layout="fill"
            />
          </div>
          <div className="p-4 text-center">
            <h2 className="text-xl font-semibold text-color_three">{productData.product_name}</h2>
            <p className="text-sm p-1 text-foreground">{productData.product_description}</p>
            <p className="text-xl font-bold mt-2 text-color_three">R$ {productData.product_price}</p>
          </div>
        </div>
      </Link>;
    products.push(productInfo)
  })
  
  console.log(products);
  
  return (
    <div>
      {products}
    </div>
  )
}