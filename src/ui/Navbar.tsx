import { NAV_LINKS } from "@/lib/constants";
import Link from "next/link";

const Navbar = () => {
  return (
    <div >
      <h1>Euldriq</h1>
      <div>
        {NAV_LINKS.map((link, index) => (
          <Link key={index} href={link.href}>
            {link.name}
          </Link>
        ))}
      </div>
    </div>
  );
};

export default Navbar;
