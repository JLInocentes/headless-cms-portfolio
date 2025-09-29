'use server'

import { revalidatePath } from "next/cache";
import { prisma } from "../prisma";

export async function getAllCategories() {
  try {
    const categories = await prisma.category.findMany({
      include: {
        projects: true,
      },
    });

    return categories;
  } catch (error) {
    console.error("Failed to fetch projects:", error);
    throw new Error("Failed to fetch projects.");
  }
}

export async function createCategory(title: string) {
  try {
    if (!title) {
      return { success: false, error: "Title is required." };
    }

    const newCategory = await prisma.category.create({
      data: {
        title,
      },
    });

    revalidatePath("/admin");
    return { success: true, category: newCategory };
  } catch (error) {
    console.error("Failed to create category:", error);
    return { success: false, error: "Failed to create category." };
  }
}