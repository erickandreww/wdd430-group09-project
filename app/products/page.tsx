// app/products/page.tsx
import { Metadata } from "next";
import Image from 'next/image';

export const metadata: Metadata = {
  title: 'Products',
};

interface Product {
  id: number;
  name: string;
  description: string;
  image: string;
  price: string;
}

const products: Product[] = [
  {
    id: 1,
    name: 'Clay Pitcher',
    description: 'A clay Spanish inspired pitcher ',
    image: '/product1.webp', 
    price: '$30',
  },
  {
    id: 2,
    name: 'Handmade Quilt',
    description: 'A handmade quilt pieced together with vintage fabric',
    image: '/product2.jpeg', // Update with the correct path
    price: '$150',
  },
  {
    id: 3,
    name: 'Local Artist 3',
    description: 'A stunning sculpture that showcases craftsmanship.',
    image: '/UI/home-page/artist3.jpeg', // Update with the correct path
    price: '$200',
  },
  // Add more products as needed
];

export default function Page() {
  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-6">Products</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {products.map(product => (
          <div key={product.id} className="border rounded-lg overflow-hidden shadow-lg">
            <Image 
              src={product.image} 
              alt={product.name} 
              width={300} 
              height={300} 
              className="w-full h-48 object-cover"
            />
            <div className="p-4">
              <h2 className="text-lg font-semibold">{product.name}</h2>
              <p className="text-sm text-gray-600">{product.description}</p>
              <p className="text-xl font-bold mt-2">{product.price}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}