import Image from 'next/image';
import Link from 'next/link';
import { getUserProducts } from '@/app/lib/data';

export default async function UserProducts({user_id} : {user_id: number}) {
    const featuredProducts = await getUserProducts(user_id);
  return (
    <>
    <h2 className=''>Your products</h2>
    <div key={1} className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-4">
      {featuredProducts?.map(product => (
        <>
          <div>
            <Link href={`products/${product.product_id}`}>
            <div className="artist-card border rounded-lg overflow-hidden shadow-lg">
              <Image 
                src={`/products/${product.product_image}`}
                alt={product.product_name} 
                width={300} 
                height={300} 
                className="w-full h-48 object-cover"
              />
              <div className="p-4">
                <h3 className="text-lg font-semibold">{product.product_name}</h3>
                <p className="text-sm text-gray-600 whitespace-nowrap overflow-hidden text-clip">{product.product_description}</p>
                <p className="text-lg font-bold mt-2">{product.product_price}</p>
              </div>
            </div>
            </Link>
            <div className='flex justify-between p-2 bg-slate-100 border rounded-lg overflow-hidden '>
              <Link href={`/sellers/edit-product/${product.product_id}`} className="w-12 mt-2 font-medium text-black hover:text-color_five md:mt-0">Edit</Link>
              <Link href='/sellers/delete-product' className="w-12 mt-2 font-medium text-black hover:text-color_five md:mt-0">Delete</Link>
            </div>
          </div>
        </>
      ))}
    </div>
    </>

  );
}