import Image from 'next/image';
import Button from '../button';

interface Artist {
  id: number;
  name: string;
  image: string;
  description: string;
}

const artists: Artist[] = [
  { id: 1, name: 'Artist 1', image: '/artist1.jpeg', description: 'Description of Artist 1' },
  { id: 2, name: 'Artist 2', image: '/artist2.jpeg', description: 'Description of Artist 2' },
  { id: 3, name: 'Artist 3', image: '/artist2.jpg', description: 'Description of Artist 3' },
  // Add more artists as needed
];

export default function Hero() {
  return (
    <div className="container mx-auto p-4">
      <div className="hero-section mb-8 text-center">
        <h2 className="text-2xl font-bold mb-4">Featured Artist</h2>
        <Button className='flex h-7 items-center bg-slate-400 px-3 text-sm font-medium text-black transition-colors hover:bg-blue-400 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-500 active:bg-blue-600 aria-disabled:cursor-not-allowed aria-disabled:opacity-50'>
          Click Me
        </Button>
        <Image src='/placeholder.jpg' alt='placeholder for now' width={300} height={300} className="mx-auto mt-4"/>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {artists.map(artist => (
          <div key={artist.id} className="artist-card border rounded-lg overflow-hidden shadow-lg">
            <Image src={artist.image} alt={artist.name} width={300} height={300} className="w-full h-48 object-cover"/>
            <div className="p-4">
              <h3 className="text-lg font-semibold">{artist.name}</h3>
              <p className="text-sm text-gray-600">{artist.description}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}