'use server'

import { HomepageContent } from "@/generated/prisma";
import { prisma } from "../prisma";
import { revalidatePath } from "next/cache";

export async function getHomePage() {
  try {
    const content = await prisma.homepageContent.findFirst();
    return content;
  } catch (error) {
    console.error("Failed to fetch projects:", error);
    throw new Error("Failed to fetch projects.");
  }
}

export async function updateHomePage(data: Partial<HomepageContent>) {
  try {
    const updatedContent = await prisma.homepageContent.upsert({
      where: { id: "main" },
      update: {
        ...data,
      },
      create: {
        id: "main",
        heroTitle: data.heroTitle || "",
        heroSubtitle: data.heroSubtitle || "",
        heroImage: data.heroImage ?? "",
        artistName: data.artistName || "",
        emailLink: data.emailLink || "",
        skills: data.skills || [],
        experiences: data.experiences || [],
        ...data,
      },
    });

    revalidatePath("/admin/homepage");
    revalidatePath("/");

    return { success: true, content: updatedContent };
  } catch (error) {
    console.error("Failed to update homepage content:", error);
    return { success: false, error: "Failed to update content." };
  }
}
