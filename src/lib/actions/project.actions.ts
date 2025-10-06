"use server";

import { prisma } from "../prisma";
import { revalidatePath } from "next/cache";

type ProjectCreateInput = {
  title: string;
  description?: string | null;
  image: string;
  categoryId: number;
};

type ProjectUpdateInput = ProjectCreateInput & {
  id: number; 
};

export async function getAllProjects() {
  try {
    const projects = await prisma.project.findMany({
      orderBy: {
        createdAt: "desc",
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

export async function updateProject(data: ProjectUpdateInput) {
  try {
    const updatedProject = await prisma.project.update({
      where: {
        id: data.id,
      },
      data: {
        title: data.title,
        description: data.description,
        image: data.image,
        categoryId: data.categoryId,
      },
    });

    revalidatePath("/admin");

    return { success: true, project: updatedProject };
  } catch (error) {
    console.error("Failed to update project:", error);
    return { success: false, error: "Failed to update project." };
  }
}

export async function deleteProject(id: number) {
  try {
    await prisma.project.delete({
      where: {
        id: id,
      },
    });

    revalidatePath("/admin");

    return { success: true };
  } catch (error) {
    console.error("Failed to delete project:", error);
    return { success: false, error: "Failed to delete project." };
  }
}
