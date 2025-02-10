import Image from 'next/image';
import Button from '../button';

export default function Hero() {
  return (
      <div className="hero-section mb-8 text-center">
        <h2 className="text-2xl font-bold mb-4">Featured Artist</h2>
        <Button className='flex h-7 items-center bg-slate-400 px-3 text-sm font-medium text-black transition-colors hover:bg-blue-400 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-500 active:bg-blue-600 aria-disabled:cursor-not-allowed aria-disabled:opacity-50'>
          Click Me
        </Button>
        <Image src='/placeholder.jpg' alt='placeholder for now' width={300} height={300} className="mx-auto mt-4"/>
      </div>
  );
}