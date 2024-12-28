"use client";

import { Session } from "next-auth";
import { Button } from "./ui/button";
import { UserButton } from "./user-button";

export default function NavBar({ session }: { session: Session }) {
  return (
    <div className="flex h-16 items-center justify-between px-4 border-b">
      {/* Left side */}
      <div className="flex items-center">
        <p>CyberTrust</p>
      </div>

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
