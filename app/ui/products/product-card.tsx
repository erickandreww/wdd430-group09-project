import Image from "next/image";
import { ProductsCard } from "@/app/lib/definitions";

const productsData: ProductsCard[] = [
  {
    id: 1,
    name: 'Local Artist 1',
    description: 'A beautiful painting that captures the essence of nature.',
    image: '/artist1.jpeg', 
    price: '$100',
  },
  {
    id: 2,
    name: 'Local Artist 2',
    description: 'An abstract piece that brings color and life to any space.',
    image: '/artist2.jpg', // Update with the correct path
    price: '$150',
  },
  {
    id: 3,
    name: 'Local Artist 3',
    description: 'A stunning sculpture that showcases craftsmanship.',
    image: '/artist3.jpg', // Update with the correct path
    price: '$200',
  },
  // Add more products as needed
];

export default async function ProductCards({
  query,
  currentPage,
}: {
  query: string;
  currentPage: number;
}) {
  const products = productsData;
  if (query !== null || currentPage !== null) {
    console.log('We need a database to filter the products')
  }

  return (
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
  )
}