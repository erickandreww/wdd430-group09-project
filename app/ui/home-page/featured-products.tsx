import Image from 'next/image';
import Link from 'next/link';
import { fetchFeaturedProducts } from '@/app/lib/data';

export default async function FeatureHomeProducts() {
  const featuredProducts = await fetchFeaturedProducts();
  return (
    <div className="py-10">
      <h2 className="text-3xl font-bold text-color_three text-center mb-8">Featured Products</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {featuredProducts?.map(product => (
          <Link key={product.product_id} href={`products/${product.product_id}`}>
            <div className="border-2 rounded-lg overflow-hidden shadow-lg border-color_three bg-color_two flex flex-col h-full transition-transform transform hover:scale-105 hover:shadow-xl">
              <div className="w-full h-64 relative">
                <Image 
                  src={product.product_image}
                  alt={product.product_name} 
                  layout="fill"
                  objectFit="cover"
                  className="absolute inset-0 w-full h-full"
                />
              </div>
              <div className="p-4 flex-1 text-center flex flex-col justify-between">
                <div>
                  <h3 className="text-2xl font-bold text-color_three mb-3">{product.product_name}</h3>
                  <p className="text-xl font-bold text-color_three">R$ {product.product_price}</p>
                </div>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}