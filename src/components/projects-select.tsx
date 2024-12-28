"use client";

import { Session } from "next-auth";
import { Button } from "./ui/button";
import { useEffect, useState } from "react";
import { projectsTable } from "@/db/schema";
import { listProjects } from "@/app/actions/queries/project";

export default function ProjectsSelect({ session }: { session: Session }) {
  const [projects, setProjects] = useState<
    (typeof projectsTable.$inferSelect)[] | []
  >([]);
  useEffect(() => {
    const fetchImages = async () => {
      try {
        const projectsData = await listProjects(session.user?.id!);
        console.log(session.user?.id);
        console.log(projectsData);
        setProjects(projectsData);
      } catch (error) {
        console.error("Error fetching images:", error);
      }
    };
    fetchImages();
  }, []);

  return (
    <div className="w-screen h-screen flex flex-col gap-3 justify-center items-center">
      <Button asChild>
        <a href="/api/auth/signout">Sign out</a>
      </Button>
    </div>
  );
}
