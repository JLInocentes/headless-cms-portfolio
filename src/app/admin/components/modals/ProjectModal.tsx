"use client";

import { useState, FormEvent, useEffect, ReactNode } from "react";
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
import { Category, Project } from "@/generated/prisma";
import { ImagePlus } from "lucide-react";
import { createProject, updateProject } from "@/lib/actions/project.actions"; 
import { toast } from "sonner";
import Image from "next/image";

type ProjectModalProps = {
  categories: Category[];
  project?: Project | null; 
  children?: ReactNode;
};

export default function ProjectModal({
  categories,
  project,
  children
}: ProjectModalProps) {
  const router = useRouter();
  const [isOpen, setIsOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [mediaUrl, setMediaUrl] = useState<string | null>(null);
  const [mediaType, setMediaType] = useState<"image" | "video" | null>(null);
  const [categoryId, setCategoryId] = useState<number | null>(null);

  const isEditMode = !!project;

  useEffect(() => {
    if (isEditMode && project) {
      setTitle(project.title);
      setDescription(project.description || "");
      setMediaUrl(project.image);
      setMediaType(project.image?.includes("video") ? "video" : "image"); 
      setCategoryId(project.categoryId);
    }
  }, [project, isEditMode, isOpen]);

  const handleOpenChange = (open: boolean) => {
    if (!open) {
      setTitle("");
      setDescription("");
      setMediaUrl(null);
      setMediaType(null);
      setCategoryId(null);
      setError("");
    }
    setIsOpen(open);
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setError("");

    if (!title || !mediaUrl || !categoryId) {
      setError("Title, media, and category are required.");
      return;
    }
    setIsLoading(true);

    const projectData = {
      title,
      description: description || null,
      image: mediaUrl,
      categoryId,
    };

    try {
      if (isEditMode && project) {
        const result = await updateProject({ id: project.id, ...projectData });
        if (result.success) {
          toast.success("Project updated successfully!");
        } else {
          throw new Error(result.error || "Failed to update project.");
        }
      } else {
        const result = await createProject(projectData);
        if (result.success) {
          toast.success("Project created successfully!");
        } else {
          throw new Error(result.error || "Failed to create project.");
        }
      }

      setIsOpen(false);
      router.refresh();
    } catch (err: any) {
      toast.error(err.message);
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={handleOpenChange} modal={false}>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent className="sm:max-w-[525px] bg-white text-black">
        <DialogHeader>
          <DialogTitle>{isEditMode ? "Edit Project" : "Add New Project"}</DialogTitle>
          <DialogDescription>
            {isEditMode ? "Update the details for this project." : "Fill out the details for your new project."}
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="title" className="text-right">Title</Label>
            <Input id="title" value={title} onChange={(e) => setTitle(e.target.value)} className="col-span-3" />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="description" className="text-right">Description</Label>
            <Textarea id="description" value={description} onChange={(e) => setDescription(e.target.value)} className="col-span-3" />
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
                      width={500}
                      height={281}
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
            <Select
              onValueChange={(value) => setCategoryId(Number(value))}
              value={categoryId?.toString()}
            >
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
          {error && <p className="text-sm text-red-500 text-center">{error}</p>}
          <DialogFooter>
            <DialogClose asChild>
              <Button type="button" variant="outline">Cancel</Button>
            </DialogClose>
            <Button type="submit" disabled={isLoading}>
              {isLoading ? "Saving..." : isEditMode ? "Save Changes" : "Save Project"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}