import { NAV_LINKS } from "@/lib/constants";
import Link from "next/link";
import { teachers } from "../fonts";

const Navbar = () => {
  return (
    <div className="w-full h-[138px]  px-[123px] flex justify-between items-center  bg-gradient-to-t from-[#000000] via-[#191919] to-[#343434] shadow-[0_4px_100px_30px_#000000]">
      <h1 className={`text-[45px] font-p400] ${teachers.className}`}>EULDRIQ</h1>
      <div className="h-full flex items-center gap-16">
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
