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
