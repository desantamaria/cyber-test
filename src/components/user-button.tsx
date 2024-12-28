"use client";

import { getUser } from "@/app/actions/queries/user";
import { usersTable } from "@/db/schema";
import { Session } from "next-auth";
import { useEffect, useState } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { Button } from "./ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";

export function UserButton({ session }: { session: Session }) {
  const [viewerInfo, setViewerInfo] = useState<
    typeof usersTable.$inferSelect | null
  >(null);
  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const userData = (await getUser(
          session.user?.id!
        )) as typeof usersTable.$inferSelect;
        setViewerInfo(userData);
      } catch (error) {
        console.error("Error fetching images:", error);
      }
    };
    fetchProjects();
  }, []);

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" className="relative h-8 w-8 rounded-full">
          <Avatar className="h-8 w-8">
            <AvatarImage
              src={viewerInfo && viewerInfo?.image ? viewerInfo.image : ""}
              alt="user"
            />
            <AvatarFallback>
              {viewerInfo && viewerInfo?.name
                ? viewerInfo.name?.charAt(0)
                : "A"}
            </AvatarFallback>
          </Avatar>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56" align="end" forceMount>
        <DropdownMenuLabel className="font-normal">
          <div className="flex flex-col space-y-1">
            <p className="text-sm font-medium leading-none">
              {viewerInfo && viewerInfo?.name ? viewerInfo.name : "User"}
            </p>
            <p className="text-xs leading-none text-muted-foreground">
              {viewerInfo && viewerInfo?.email
                ? viewerInfo.email
                : "example@user.com"}
            </p>
          </div>
        </DropdownMenuLabel>
        {/* <DropdownMenuSeparator />
        <DropdownMenuGroup>
          <DropdownMenuItem>
            <Link href="" className="w-full h-full">
              Manage Account
            </Link>
          </DropdownMenuItem>
        </DropdownMenuGroup> */}
        <DropdownMenuSeparator />
        <a href="/api/auth/signout">
          <DropdownMenuItem className="hover:cursor-pointer">
            Sign out
          </DropdownMenuItem>
        </a>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
