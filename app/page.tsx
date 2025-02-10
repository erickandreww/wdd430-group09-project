import Hero from "./ui/home-page/hero";
import FeatureHomeProducts from "./ui/home-page/featured-products";

export default function Page() {
  return (
    <>
      <main className="container mx-auto p-4">
        <p>Home Page</p>
        <Hero/>
        <section className="pb-10">
          <h2>Story of the page</h2>
          <p>here we will put the story of the page, a small description of it</p>
        </section>
        <div>
        <FeatureHomeProducts/>
        </div>
      </main>
    </>
  );
}
