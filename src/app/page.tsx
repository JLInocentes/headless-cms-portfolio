import { getProjects } from "@/lib/data";
import Navbar from "@/ui/components/Navbar";

export default function Home() {
  
  const projects = getProjects();

  return (
    <>
      <Navbar />
      <div>
      </div>
    </>
  );
}
