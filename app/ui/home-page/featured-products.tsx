import Image from 'next/image';
import Link from 'next/link';
import { fetchFeaturedProducts } from '@/app/lib/data';

export default async function FeatureHomeProducts() {
    const featuredProducts = await fetchFeaturedProducts();
  return (
    <div>
      <h2>Featured Products</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-4 px-5">
        {featuredProducts?.map(product => (
          <Link key={product.product_id} href={`products/${product.product_id}`}>
          <div className="border rounded-lg overflow-hidden shadow-lg border-color_three bg-color_four flex flex-col min-h-[370px]">
            <div className="w-full h-64 relative">
              <Image 
                src={`${product.product_image}`}
                alt={product.product_name} 
                width={0} 
                height={0} 
                className="absolute inset-0 w-full h-full object-cover"
                layout="fill"
              />
            </div>
            <div className="p-2 flex-1 text-center">
              <h3 className="text-xl font-semibold text-color_three">{product.product_name}</h3>
              <p className="text-sm p-1 text-foreground">{product.product_description}</p>
              <p className="text-xl font-bold mt-2 text-color_three">R$ {product.product_price}</p>
            </div>
          </div>
        </Link>
        ))}
      </div>
    </div>
  );
}