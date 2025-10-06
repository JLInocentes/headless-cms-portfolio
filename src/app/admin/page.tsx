import { getAllProjects } from "@/lib/actions/project.actions";
import { getAllCategories } from "@/lib/actions/categories.actions";
import AdminDashboard from "./components/AdminDashboard";
import Login from "@/ui/components/Login";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";

export default async function AdminPage() {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Login />
      </div>
    );
  }

  const projects = await getAllProjects();
  const categories = await getAllCategories();

  return (
    <AdminDashboard
      projects={projects}
      categories={categories}
      user={session.user}
    />
  );
}
