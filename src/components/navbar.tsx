"use client";

import { Session } from "next-auth";
import { Button } from "./ui/button";
import { UserButton } from "./user-button";
import ProjectNav from "./project-nav";
import Link from "next/link";

export default function NavBar({
  session,
  projectId,
}: {
  session: Session;
  projectId?: string;
}) {
  return (
    <div className="flex h-16 items-center justify-between px-4 border-b">
      {/* Left side */}
      <div className="flex items-center">
        <Link href="/">
          <h3 className="scroll-m-20 text-2xl font-semibold tracking-tight">
            CyberTrust
          </h3>
        </Link>
      </div>

      {projectId ? (
        <>
          <ProjectNav id={projectId}></ProjectNav>
        </>
      ) : (
        <></>
      )}

      {/* Right side */}
      <div className="flex items-center space-x-4">
        {!session ? (
          <Button asChild>
            <a href="/api/auth/signin">Sign in</a>
          </Button>
        ) : (
          <UserButton session={session} />
        )}
      </div>
    </div>
  );
}
