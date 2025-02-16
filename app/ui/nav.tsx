import NavLinks from "./nav-links";

export default function Nav() {
  return (
    <nav className="w-full bg-color_two px-3 py-4 md:w-44 lg:w-56">
      <div className="flex flex-col justify-between space-y-4">
        <NavLinks />
      </div>
    </nav>
  );
}