"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

import { toast } from "sonner";
import { ImagePlus, Loader2 } from "lucide-react";
import { HomepageContent } from "@/generated/prisma";
import { Textarea } from "@/components/ui/textarea";
import { updateHomePage } from "@/lib/actions/pages.actions";
import { CldUploadButton } from "next-cloudinary";
import Image from "next/image";
import { CLOUDINARY_UPLOAD_PRESET } from "@/lib/constants";
import { useRouter } from "next/navigation";

type HomePageContentProps = {
  content: HomepageContent | null;
};

export default function HomePageContentForm({ content }: HomePageContentProps) {
  const [isLoading, setIsLoading] = useState(false);

  const [heroTitle, setHeroTitle] = useState("");
  const [heroSubtitle, setHeroSubtitle] = useState("");
  const [artistName, setArtistName] = useState("");
  const [instagramUrl, setInstagramUrl] = useState("");
  const [facebookUrl, setFacebookUrl] = useState("");
  const [tiktokUrl, setTiktokUrl] = useState("");
  const [emailLink, setEmailLink] = useState("");
  const [skills, setSkills] = useState("");
  const [experiences, setExperiences] = useState("");
  const [heroImage, setHeroImage] = useState("");

  const [heroImageWidth, setHeroImageWidth] = useState<number | undefined>();
  const [heroImageHeight, setHeroImageHeight] = useState<number | undefined>();

  const router = useRouter();

  useEffect(() => {
    if (content) {
      setHeroTitle(content.heroTitle || "");
      setHeroSubtitle(content.heroSubtitle || "");
      setArtistName(content.artistName || "");
      setInstagramUrl(content.instagramUrl || "");
      setFacebookUrl(content.facebookUrl || "");
      setTiktokUrl(content.tiktokUrl || "");
      setEmailLink(content.emailLink || "");
      setSkills(content.skills.join("\n"));
      setExperiences(content.experiences.join("\n"));
      setHeroImage(content.heroImage || "");
    }
  }, [content]);

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    setIsLoading(true);

    const formData = {
      heroTitle,
      heroSubtitle,
      artistName,
      instagramUrl,
      facebookUrl,
      tiktokUrl,
      emailLink,
      skills: skills
        .split("\n")
        .map((s) => s.trim())
        .filter(Boolean),
      experiences: experiences
        .split("\n")
        .map((e) => e.trim())
        .filter(Boolean),
    };

    const result = await updateHomePage(formData);

    if (result) {
      toast.success("Page content updated successfully!");
      router.push("/admin");
    } else {
      toast.error("Failed to update content.");
    }
    setIsLoading(false);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-8 p-8">
      <div className="space-y-4 border-b border-gray-600 pb-6">
        <h2 className="text-xl font-semibold text-white">Hero Section</h2>
        <div>
          <Label htmlFor="heroTitle" className="text-gray-300">
            Main Title
          </Label>
          <Input
            id="heroTitle"
            value={heroTitle}
            onChange={(e) => setHeroTitle(e.target.value)}
            placeholder="A Multimedia artist and..."
          />
        </div>
        <div>
          <Label htmlFor="heroSubtitle" className="text-gray-300">
            Subtitle
          </Label>
          <Input
            id="heroSubtitle"
            value={heroSubtitle}
            onChange={(e) => setHeroSubtitle(e.target.value)}
            placeholder="3D Artist, etc."
          />
        </div>
        <div>
          <Label htmlFor="artistName" className="text-gray-300">
            Artist Name
          </Label>
          <Input
            id="artistName"
            value={artistName}
            onChange={(e) => setArtistName(e.target.value)}
            placeholder="Artist Tovi Bandioque"
          />
        </div>
        <div className="flex flex-col gap-4">
          <Label htmlFor="heroImage" className="text-gray-300">
            Hero Image
          </Label>
          <CldUploadButton
            onSuccess={(result: any) => {
              setHeroImage(result.info.secure_url);
              setHeroImageWidth(result.info.width);
              setHeroImageHeight(result.info.height);
            }}
            uploadPreset={CLOUDINARY_UPLOAD_PRESET}
            className="cursor-pointer"
          >
            <div className="flex items-center justify-center gap-2 w-full h-24 border-2 border-dashed border-gray-300 rounded-md hover:bg-gray-50 transition-colors">
              <ImagePlus className="h-6 w-6 text-gray-400" />
              <span className="text-gray-500">Upload Media</span>
            </div>
          </CldUploadButton>
          {heroImage && (
            <div className="rounded-md overflow-hidden">
              <Image
                width={heroImageWidth || 500}
                height={heroImageHeight || 281}
                src={heroImage}
                alt="Uploaded preview"
                className="w-full h-auto object-cover"
              />
            </div>
          )}
        </div>
      </div>

      <div className="space-y-4 border-b border-gray-600 pb-6">
        <h2 className="text-xl font-semibold text-white">Links</h2>
        <div>
          <Label htmlFor="emailLink" className="text-gray-300">
            "Send me an Email" Link
          </Label>
          <Input
            id="emailLink"
            value={emailLink}
            onChange={(e) => setEmailLink(e.target.value)}
            placeholder="mailto:example@email.com"
          />
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <Label htmlFor="instagramUrl" className="text-gray-300">
              Instagram URL
            </Label>
            <Input
              id="instagramUrl"
              value={instagramUrl}
              onChange={(e) => setInstagramUrl(e.target.value)}
            />
          </div>
          <div>
            <Label htmlFor="facebookUrl" className="text-gray-300">
              Facebook URL
            </Label>
            <Input
              id="facebookUrl"
              value={facebookUrl}
              onChange={(e) => setFacebookUrl(e.target.value)}
            />
          </div>
          <div>
            <Label htmlFor="tiktokUrl" className="text-gray-300">
              TikTok URL
            </Label>
            <Input
              id="tiktokUrl"
              value={tiktokUrl}
              onChange={(e) => setTiktokUrl(e.target.value)}
            />
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="space-y-2">
          <h2 className="text-xl font-semibold text-white">Skills to Offer</h2>
          <Label htmlFor="skills" className="text-sm text-gray-400">
            Enter one skill per line.
          </Label>
          <Textarea
            id="skills"
            value={skills}
            onChange={(e) => setSkills(e.target.value)}
            rows={10}
            className="bg-gray-700 text-white border-gray-600"
          />
        </div>
        <div className="space-y-2">
          <h2 className="text-xl font-semibold text-white">Experiences</h2>
          <Label htmlFor="experiences" className="text-sm text-gray-400">
            Enter one experience per line.
          </Label>
          <Textarea
            id="experiences"
            value={experiences}
            onChange={(e) => setExperiences(e.target.value)}
            rows={10}
            className="bg-gray-700 text-white border-gray-600"
          />
        </div>
      </div>

      <div className="flex justify-end">
        <Button type="submit" disabled={isLoading} className="w-32 cursor-pointer border">
          {isLoading ? (
            <Loader2 className="h-4 w-4 animate-spin" />
          ) : (
            "Save Changes"
          )}
        </Button>
      </div>
    </form>
  );
}
