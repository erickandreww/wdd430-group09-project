import Image from 'next/image';
import Button from '../button';

export default function Hero() {
  return (
    <div className="hero-section relative mb-8 h-[300px] sm:h-[400px] md:h-[500px] lg:h-[600px] overflow-hidden rounded-lg shadow-lg">
      <Image 
        src="/hero.jpg" 
        alt="Colorful Wool Art" 
        layout="fill"
        objectFit="cover"
        className="absolute inset-0 w-full h-full"
      />
      <div className="absolute inset-0 bg-black/30" />
      <div className="absolute inset-0 flex flex-col items-center justify-center text-center p-4">
        <h2 className="text-5xl font-bold text-background mb-6 z-10 drop-shadow-lg">
          Handcrafted Haven
        </h2>
        <p className="text-xl text-background mb-8 z-10 drop-shadow-lg max-w-2xl">
          Discover the vibrant world of art. <br /> Explore unique creations that blend color and creativity.
        </p>
        <Button className="z-10 flex h-12 items-center bg-color_three px-8 text-sm font-medium text-background transition-all hover:bg-color_five hover:scale-105 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-color_three active:bg-color_three aria-disabled:cursor-not-allowed aria-disabled:opacity-50">
          Explore Now
        </Button>
      </div>
    </div>
  );
}