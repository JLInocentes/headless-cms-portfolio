import { prisma } from "./prisma";

export async function getProjects() {
  return await prisma.project.findMany();
}

export async function getProjectById(id: number) {
  return await prisma.project.findUnique({
    where: { id },
  });
}
