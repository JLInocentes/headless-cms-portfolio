'use server'

import { prisma } from "../prisma";
import { revalidatePath } from "next/cache";

type ProjectCreateInput = {
  title: string;
  description?: string | null;
  image: string;
  categoryId: number;
};

export async function getAllProjects() {
  try {
    const projects = await prisma.project.findMany({
      orderBy: {
        createdAt: 'desc', 
      },
      include: {
        category: true,
      },
    });
    return projects;
  } catch (error) {
    console.error("Failed to fetch projects:", error);
    throw new Error("Failed to fetch projects.");
  }
}

export async function createProject(data: ProjectCreateInput) {
  try {
    const newProject = await prisma.project.create({
      data: {
        title: data.title,
        description: data.description,
        image: data.image,
        categoryId: data.categoryId,
      },
    });

    revalidatePath("/admin");

    return { success: true, project: newProject };
  } catch (error) {
    console.error("Failed to create project:", error);
    return { success: false, error: "Failed to create project." };
  }
}