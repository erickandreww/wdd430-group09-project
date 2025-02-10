import Image from 'next/image';
import Link from 'next/link';
import { fetchFeaturedProducts } from '@/app/lib/data';

export default async function FeatureHomeProducts() {
    const featuredProducts = await fetchFeaturedProducts();
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
      {featuredProducts.map(product => (
        <Link key={product.product_id} href={`products/${product.product_id}`}>
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
              <p className="text-sm text-gray-600">{product.product_description}</p>
              <p className="text-lg font-bold mt-2">{product.product_price}</p>
            </div>
          </div>
        </Link>
      ))}
    </div>
  );
}