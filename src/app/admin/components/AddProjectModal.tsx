"use client";

import { Button } from "@/components/ui/button";
import { CldUploadButton } from "next-cloudinary";
import {
  Dialog,
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
import { useState } from "react";
import { ImagePlus } from "lucide-react";

type AddProjectModalProps = {
  categories: Category[];
};

export default function AddProjectModal({ categories }: AddProjectModalProps) {
  const [mediaUrl, setMediaUrl] = useState<string | null>(null);
  const [mediaType, setMediaType] = useState<string | null>(null);

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button className="ml-auto">Add New Project</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[525px] bg-white text-black">
        <DialogHeader>
          <DialogTitle>Add New Project</DialogTitle>
          <DialogDescription>
            Fill out the details for your new project. Click save when you're
            done.
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="title" className="text-right">
              Title
            </Label>
            <Input id="title" className="col-span-3" />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="description" className="text-right">
              Description
            </Label>
            <Textarea id="description" className="col-span-3" />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label className="text-right">Image</Label>
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
                  <span className="text-gray-500">Upload an Image</span>
                </div>
              </CldUploadButton>
              {mediaUrl && (
                <div className="mt-4">
                  {mediaType === "video" ? (
                    <video
                      controls
                      src={mediaUrl}
                      className="rounded-md w-full"
                    />
                  ) : (
                    <img
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
            <Label htmlFor="category" className="text-right">
              Category
            </Label>
            <Select>
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
        <DialogFooter>
          <Button type="submit">Save Project</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
