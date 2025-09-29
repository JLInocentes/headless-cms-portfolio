import { NAV_LINKS } from "@/lib/constants";
import Link from "next/link";
import { teachers } from "../fonts";

const Navbar = () => {
  return (
    <div className="w-full flex justify-between items-center p-[20] px-[100]">
      <h1 className={`text-6xl font-semibold${teachers.className}`}>EULDRIQ</h1>
      <div className="h-full flex align-center gap-16">
        {NAV_LINKS.map((link, index) => (
          <Link key={index} href={link.href} className={`font-bold text-xl`}>
            {link.name}
          </Link>
        ))}
      </div>
    </div>
  );
};

export default Navbar;
