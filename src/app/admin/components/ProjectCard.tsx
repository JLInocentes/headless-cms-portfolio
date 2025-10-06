import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Category, Project } from "@/generated/prisma";
import { Pencil, Trash } from "lucide-react";
import Image from "next/image";
import ProjectModal from "./modals/ProjectModal";
import DeleteConfirmation from "./modals/DeleteConfirmation";
import { deleteProject } from "@/lib/actions/project.actions";

interface ProjectCardProps {
  project: Project & Category;
  categories: Category[];
}

const ProjectCard = ({ project, categories }: ProjectCardProps) => {


  return (
    <Card key={project.id}>
      <CardHeader>
        <Image
          width={500}
          height={500}
          src={project.image}
          alt={project.title}
          className="rounded-md mb-4 aspect-video object-cover"
        />
        <CardTitle>{project.title}</CardTitle>
        <CardDescription>{project.title}</CardDescription>
      </CardHeader>
      <CardContent>
        <p className="text-sm text-gray-700">{project.description}</p>
      </CardContent>
      <div className="flex gap-4 justify-end px-8">
        <ProjectModal project={project} categories={categories}>
          <Button className="bg-blue-500">
            <Pencil />
          </Button>
        </ProjectModal>
        <DeleteConfirmation deleteFn={() => deleteProject(project.id)}>
          <Button className="bg-red-500">
            <Trash />
          </Button>
        </DeleteConfirmation>
      </div>
    </Card>
  );
};

export default ProjectCard;
