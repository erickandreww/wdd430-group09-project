import Hero from "./ui/home-page/hero";
import FeatureHomeProducts from "./ui/home-page/featured-products";

export default function Page() {
  return (
    <main className="container mx-auto p-8 bg-background text-foreground min-h-screen flex flex-col gap-12">
      <Hero />
      <section className="text-center max-w-3xl mx-auto">
        <h2 className="text-4xl font-extrabold text-color_three mb-6">Our Story</h2>
        <p className="text-lg leading-relaxed text-color_three">
          Discover our journey and the passion behind our products. We strive to provide excellence and uniqueness in everything we create.
        </p>
      </section>
      <FeatureHomeProducts />
    </main>
  );
}