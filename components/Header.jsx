import Link from "next/link";
import { Button } from "./ui/button";

// components
import Nav from "./Nav";
import MobileNav from "./MobileNav";

const Header = () => {
  return (
    <header className="py-4 sm:py-6 xl:py-12 text-white bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900">
      <div className="container mx-auto flex justify-between items-center px-4">
        {/* logo */}
        {/* <Link href="#about">
          <h1 className="text-4xl font-semibold cursor-pointer">
            Raghav<span className="text-accent"></span>
          </h1>
        </Link> */}

        {/* desktop nav & hire me button */}
        <div className="hidden xl:flex items-center gap-8 ml-auto">
          <Nav />

        </div>

        {/* mobile nav */}
        <MobileNav />
      </div>
    </header>
  );
};

export default Header;
