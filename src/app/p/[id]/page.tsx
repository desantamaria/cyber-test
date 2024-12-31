"use client";

import { getProjectById } from "@/app/actions/queries/project";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { projectsTable } from "@/db/schema";
import { use, useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ArrowLeftIcon, CalendarIcon, UserIcon } from "lucide-react";
import Link from "next/link";

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
  }, [id]);

  return (
    <div className="container mx-auto py-10">
      <div className="max-w-3xl mx-auto">
        <div className="mb-3">
          <Button asChild size="sm" variant="ghost" className="my-1">
            <Link href="/">
              <ArrowLeftIcon className="mr-2 h-4 w-4" /> Back to Projects
            </Link>
          </Button>
        </div>
        <Card className="w-full">
          <CardHeader>
            <CardTitle className="text-3xl font-bold">
              Project: <Badge variant="secondary">id: {id}</Badge>
            </CardTitle>
          </CardHeader>
          <CardContent>
            {!loading ? (
              <div className="space-y-4">
                <div className="flex items-center space-x-2">
                  <h3 className="text-lg font-semibold">Name:</h3>
                  <p className="text-lg">{project?.name}</p>
                </div>
                <div className="flex items-center space-x-2">
                  <CalendarIcon className="h-5 w-5 text-muted-foreground" />
                  <h3 className="text-sm font-semibold">Updated At:</h3>
                  <p className="text-sm text-muted-foreground">
                    {project?.updated.toLocaleString()}
                  </p>
                </div>
                <div className="flex items-center space-x-2">
                  <UserIcon className="h-5 w-5 text-muted-foreground" />
                  <h3 className="text-sm font-semibold">Created By:</h3>
                  <p className="text-sm text-muted-foreground">
                    {project?.creator}
                  </p>
                </div>
              </div>
            ) : (
              <div className="space-y-4">
                <Skeleton className="h-6 w-2/3" />
                <Skeleton className="h-4 w-1/2" />
                <Skeleton className="h-4 w-1/3" />
              </div>
            )}
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 mt-8">
              <Button variant="outline" className="w-full" asChild>
                <Link href={`/p/${id}/experiments`}>View Experiments</Link>
              </Button>
              <Button variant="outline" className="w-full" asChild>
                <Link href={`/p/${id}/test-cases`}>View Test Cases</Link>
              </Button>
              <Button variant="outline" className="w-full" asChild>
                <Link href={`/p/${id}/prompts`}>View Prompts</Link>
              </Button>
              <Button variant="outline" className="w-full" asChild>
                <Link href={`/p/${id}/graders`}>View Graders</Link>
              </Button>
              <Button
                variant="secondary"
                className="w-full sm:col-span-2"
                asChild
              >
                <Link href={`/p/${id}/experiment-runs`}>
                  View Experiment Runs
                </Link>
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
