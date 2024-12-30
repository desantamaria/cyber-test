"use client";

import { getProjectById } from "@/app/actions/queries/project";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { projectsTable } from "@/db/schema";
import { use, useEffect, useState } from "react";

export default function ProjectPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = use(params);

  const [project, setProject] = useState<
    typeof projectsTable.$inferSelect | null
  >(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchProject = async () => {
      try {
        setLoading(true);
        const projectData = await getProjectById(parseInt(id));
        setProject(projectData!);
      } catch (error) {
        console.error("Error fetching project", error);
        setProject(null);
      } finally {
        setLoading(false);
      }
    };
    fetchProject();
  }, [params]);

  return (
    <div className="w-full h-full py-10 flex flex-col gap-4 items-center bg-gray-100">
      <div className="w-[40vw] h-auto p-5 bg-white shadow-md rounded-lg">
        <h3 className="scroll-m-20 text-3xl font-bold tracking-tight mb-4">
          Project:{" "}
          <span style={{ color: "gray" }} className="font-normal">
            {id}
          </span>
        </h3>
        {!loading ? (
          <>
            <p className="text-lg font-medium">
              Name: <span className="font-light">{project?.name}</span>
            </p>
            <p className="text-lg font-medium">
              Updated At:
              <span className="font-light">
                {project?.updated.toISOString()}
              </span>
            </p>
            <p className="text-lg font-medium">
              Created By: <span className="font-light">{project?.creator}</span>
            </p>
          </>
        ) : (
          <>
            <Skeleton className="w-[100px] h-[20px] rounded-full mb-2" />
            <Skeleton className="w-[50px] h-[20px] rounded-full mb-2" />
            <Skeleton className="w-[70px] h-[20px] rounded-full mb-2" />
          </>
        )}
        <div className="flex flex-wrap py-10 gap-2">
          <Button variant="outline">View Experiments</Button>
          <Button variant="outline">View Test Cases</Button>
          <Button variant="outline">View Prompts</Button>
          <Button variant="outline">View Graders</Button>
          <Button variant="secondary">View Experiment Runs</Button>
        </div>
      </div>
    </div>
  );
}
