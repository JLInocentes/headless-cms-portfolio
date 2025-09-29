"use client";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Category, Project } from "@/generated/prisma";
import { User } from "better-auth";
import { LogOut, Palette, Tag } from "lucide-react";
import UserActions from "./UserActions";
import AddProjectModal from "./AddProjectModal";

type AdminDashboardProps = {
  projects: (Project & { category: Category })[];
  categories: Category[];
  user: User;
};

export default function AdminDashboard({
  projects,
  categories,
  user,
}: AdminDashboardProps) {
  return (
    <div className="h-full px-8 text-white">
      <div className="flex justify-between px-8 pt-8 items-center border-b">
        <h1>Welcome, {user.name}</h1>
        <UserActions />
      </div>
      <div className="p-8 flex justify-between items-center mb-8 rounded-lg">
        <div>
          <div className="flex items-center mb-4">
            <h2 className="text-xl font-semibold">Statistics</h2>
          </div>
          <div className="flex gap-4">
            <div className="flex items-center gap-3 p-4 border rounded-lg ">
              <Palette className="text-blue-500" />
              <div>
                <h3 className="font-bold text-lg">Projects</h3>
                <p className="text-2xl font-bold">{projects.length}</p>
              </div>
            </div>
            <div className="flex items-center gap-3 p-4 border rounded-lg ">
              <Tag className="text-green-500" />
              <div>
                <h3 className="font-bold text-lg">Categories</h3>
                <p className="text-2xl font-bold">{categories.length}</p>
              </div>
            </div>
          </div>
        </div>
        <div className="flex flex-col gap-6">
          <Button className="border">Add a Category</Button>
          <AddProjectModal categories={categories}/>
        </div>
      </div>

      <div>
        <h2 className="text-2xl font-bold mb-4">Your Projects</h2>
        <Tabs defaultValue={categories[0]?.id.toString() ?? ""}>
          <TabsList>
            {categories.map((category) => (
              <TabsTrigger key={category.id} value={category.id.toString()}>
                {category.title}
              </TabsTrigger>
            ))}
          </TabsList>

          {categories.map((category) => (
            <TabsContent key={category.id} value={category.id.toString()}>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-4">
                {projects
                  .filter((project) => project.categoryId === category.id)
                  .map((project) => (
                    <Card key={project.id}>
                      <CardHeader>
                        <img
                          src={project.image}
                          alt={project.title}
                          className="rounded-md mb-4 aspect-video object-cover"
                        />
                        <CardTitle>{project.title}</CardTitle>
                        <CardDescription>
                          {project.category.title}
                        </CardDescription>
                      </CardHeader>
                      <CardContent>
                        <p className="text-sm text-gray-700">
                          {project.description}
                        </p>
                      </CardContent>
                    </Card>
                  ))}
              </div>
            </TabsContent>
          ))}
        </Tabs>
      </div>
    </div>
  );
}
