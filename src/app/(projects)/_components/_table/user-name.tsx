"use client";

import { getUser } from "@/app/actions/queries/user";
import { usersTable } from "@/db/schema";
import { useEffect, useState } from "react";

export function UserName({ id }: { id: number }) {
  const [viewerInfo, setViewerInfo] = useState<
    typeof usersTable.$inferSelect | null
  >(null);
  useEffect(() => {
    const fetchUser = async () => {
      try {
        const userData = (await getUser(
          id.toString()
        )) as typeof usersTable.$inferSelect;
        setViewerInfo(userData);
        console.log(userData);
      } catch (error) {
        console.error("Error fetching images:", error);
      }
    };
    fetchUser();
  }, []);

  return <>{viewerInfo?.name}</>;
}
