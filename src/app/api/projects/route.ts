import { getAllProjects } from "@/lib/actions/project.actions";
import { NextResponse } from "next/server";

export async function GET(request: Request) {
  try {
    const projects = await getAllProjects();
    return NextResponse.json(projects);
    
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to fetch projects" },
      { status: 500 }
    );
  }
}