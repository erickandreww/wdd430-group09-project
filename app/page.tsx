import Hero from "./ui/home-page/hero";

export default function Page() {
  return (
    <>
      <main className="">
        <p>Home Page</p>
        <Hero/>
        <section>
          <h2>Story of the page</h2>
          <p>here we will put the story of the page, a small description of it</p>
        </section>
        {/* <RandomProducts/> */}
      </main>
    </>
  );
}
