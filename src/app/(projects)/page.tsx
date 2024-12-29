import { auth } from "@/auth";
import { Button } from "@/components/ui/button";
import ProjectsPage from "./_components/projects-page";
import Link from "next/link";

export default async function Home() {
  const session = await auth();
  return (
    <div>
      <main>
        {!session ? (
          <div className="w-full h-full flex flex-col gap-3 justify-center items-center">
            <h1 className="scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl">
              Cyber Trust
            </h1>
            <Button asChild>
              <Link href="/api/auth/signin">Sign in</Link>
            </Button>
          </div>
        ) : (
          <ProjectsPage />
        )}
      </main>
    </div>
  );
}
