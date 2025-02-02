import NavLinks from "./nav-links";

export default function Nav() {
  return (
    <div className="fixed left-0 z-40 w-56 bg-color_two px-3 py-4 md:px-2">
      <div className="flex flex-col justify-between space-y-4">
        <NavLinks />
        <div className="hidden h-auto w-full grow rounded-md md:block"></div>
      </div>
    </div>
  );
}