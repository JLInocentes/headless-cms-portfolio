import { Button } from "@/components/ui/button";
import { getHomePage } from "@/lib/actions/pages.actions";
import Navbar from "@/ui/components/Navbar";
import Image from "next/image";
import { Instagram, } from "lucide-react";
import { InstagramIcon } from "@/components/icons/InstagramIcon";
import { FacebookIcon } from "@/components/icons/FacebookIcon";
import { TikTokIcon } from "@/components/icons/TiktokIcon";

export default async function Home() {
  const content = await getHomePage();

  if (!content) {
    return (
      <>
        <Navbar />
        <main className="flex items-center justify-center h-screen bg-black">
          <p className="text-white">
            Homepage content is being set up. Please check back later.
          </p>
        </main>
      </>
    );
  }

  return (
    <>
      <Navbar />
      <main className="bg-black py-4 px-[150px] flex flex-col items-center">
        <div className="relative mb-[60px]">
          <Image
            src={content.heroImage}
            alt={content.heroTitle || "Portfolio hero image"}
            width={1080}
            height={556}
            priority
          />
          <div className="text-white text-center absolute -bottom-[25px] left-1/2 -translate-x-1/2 w-[500px]">
            <h1 className="text-4xl font-bold mb-[40px]">{content.heroTitle}</h1>
            <p className="mt-2 font-normal text-xl">{content.artistName}</p>
          </div>
        </div>
        <div className="flex gap-[30px] mb-[200px]">
          {content.instagramUrl && (
            <a href={content.instagramUrl} target="_blank">
              <InstagramIcon className="w-[40px] h-[40px] cursor-pointer" />
            </a>
          )}

          {content.facebookUrl && (
            <a href={content.facebookUrl} target="_blank">
              <FacebookIcon className="w-[40px] h-[40px] cursor-pointer" />
            </a>
          )}

          {content.tiktokUrl && (
            <a href={content.tiktokUrl} target="_blank">
              <TikTokIcon className="w-[40px] h-[40px] cursor-pointer" />
            </a>
          )}</div>
        <Button className="bg-[#861524] w-[250px] h-[70px] rounded-lg border border-[#FF203E] font-semibold text-xl mb-[280px]">Send Me An Email</Button>

        <section className="flex w-full max-w-5xl gap-16 text-white mb-[100px]">

          <article className="w-1/2">
            <h2 className="font-bold text-[32px] mb-[40px]">Skills to offer</h2>
            <ul className="list-disc list-inside space-y-3">
              {content.skills.map((skill, index) => (
                <li key={index} className="text-lg">{skill}</li>
              ))}
            </ul>
          </article>


          <article className="w-1/2 border-l border-white pl-16">
            <h2 className="font-bold text-[32px] mb-[40px]">Experiences</h2>
            <ul className="list-disc list-inside space-y-3">
              {content.experiences.map((exp, index) => (
                <li key={index} className="text-lg">{exp}</li>
              ))}
            </ul>
          </article>

        </section>
      </main>
    </>
  );
}
