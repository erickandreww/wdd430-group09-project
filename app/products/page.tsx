// app/products/page.tsx
"use client"; // Ensure this is at the top of the file

import Image from 'next/image';
import { useCart } from '../../context/cartContext'; // Import the useCart hook

// Define the Product interface
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
    image: '/product2.jpeg',
    price: '$150',
  },
  {
    id: 3,
    name: 'Local Artist 3',
    description: 'A stunning sculpture that showcases craftsmanship.',
    image: '/UI/home-page/artist3.jpeg',
    price: '$200',
  },
  // Add more products as needed
];

// Mark the component as a client component
export default function Page() {
  const { addToCart } = useCart(); // Use the addToCart function from the context

  const handleAddToCart = (product: Product) => {
    // Convert price to a number for easier calculations later
    const priceNumber = parseFloat(product.price.replace('$', ''));
    // Add product to cart, including the image
    addToCart({ ...product, price: priceNumber }); // Add product to cart
  };

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
              <button 
                onClick={() => handleAddToCart(product)} 
                className="mt-4 bg-blue-500 text-white py-2 px-4 rounded"
              >
                Add to Cart
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}