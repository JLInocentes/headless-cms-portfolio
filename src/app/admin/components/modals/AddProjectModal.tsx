"use client";

import { useState, FormEvent } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { CldUploadButton } from "next-cloudinary";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Category } from "@/generated/prisma";
import { ImagePlus } from "lucide-react";
import { createProject } from "@/lib/actions/project.actions";
import { toast } from "sonner";
import Image from "next/image";

type AddProjectModalProps = {
  categories: Category[];
};

export default function AddProjectModal({ categories }: AddProjectModalProps) {
  const router = useRouter();
  const [isOpen, setIsOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [mediaUrl, setMediaUrl] = useState<string | null>(null);
  const [mediaType, setMediaType] = useState<"image" | "video" | null>(null);
  const [categoryId, setCategoryId] = useState<number | null>(null);

  const resetForm = () => {
    setTitle("");
    setDescription("");
    setMediaUrl(null);
    setMediaType(null);
    setCategoryId(null);
    setError("");
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setError("");

    if (!title || !mediaUrl || !categoryId) {
      setError("Title, media, and category are required.");
      return;
    }
    setIsLoading(true);

    const result = await createProject({
      title,
      description: description || null,
      image: mediaUrl,
      categoryId,
    });

    setIsLoading(false);
    if (result.success) {
      toast.success("Project created successfully!", {
        description: "Matagumpay na nagawa ang proyekto!",
      });
      setIsOpen(false);
      resetForm();
      router.refresh();
    } else {
      toast.error("Failed to create project.", {
        description: result.error,
      });
      setError(result.error || "An unknown error occurred.");
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen} modal={false}>
      <DialogTrigger asChild>
        <Button className="ml-auto border">Add New Project</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[525px] bg-white text-black">
        <DialogHeader>
          <DialogTitle>Add New Project</DialogTitle>
          <DialogDescription>
            Fill out the details for your new project. Click save when you're done.
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit}>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="title" className="text-right">Title</Label>
              <Input
                id="title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="col-span-3"
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="description" className="text-right">Description</Label>
              <Textarea
                id="description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                className="col-span-3"
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label className="text-right">Media</Label>
              <div className="col-span-3">
                <CldUploadButton
                  onSuccess={(result: any) => {
                    setMediaUrl(result.info.secure_url);
                    setMediaType(result.info.resource_type);
                  }}
                  uploadPreset="cms-upload-preset"
                  className="w-full"
                >
                  <div className="flex items-center justify-center gap-2 w-full h-24 border-2 border-dashed border-gray-300 rounded-md hover:bg-gray-50 transition-colors">
                    <ImagePlus className="h-6 w-6 text-gray-400" />
                    <span className="text-gray-500">Upload Media</span>
                  </div>
                </CldUploadButton>
                {mediaUrl && (
                  <div className="mt-4">
                    {mediaType === "video" ? (
                      <video controls src={mediaUrl} className="rounded-md w-full" />
                    ) : (
                      <Image
                        src={mediaUrl}
                        alt="Uploaded preview"
                        className="rounded-md aspect-video object-cover"
                      />
                    )}
                  </div>
                )}
              </div>
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="category" className="text-right">Category</Label>
              <Select onValueChange={(value) => setCategoryId(Number(value))}>
                <SelectTrigger className="col-span-3">
                  <SelectValue placeholder="Select a category" />
                </SelectTrigger>
                <SelectContent>
                  {categories.map((category) => (
                    <SelectItem key={category.id} value={category.id.toString()}>
                      {category.title}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
          {error && <p className="text-sm text-red-500 text-center">{error}</p>}
          <DialogFooter>
            <DialogClose asChild>
              <Button type="button" variant="outline">Cancel</Button>
            </DialogClose>
            <Button type="submit" disabled={isLoading}>
              {isLoading ? "Saving..." : "Save Project"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}