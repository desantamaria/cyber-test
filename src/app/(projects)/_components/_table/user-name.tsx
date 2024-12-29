"use client";

import { getUser } from "@/app/actions/queries/user";
import { Skeleton } from "@/components/ui/skeleton";
import { usersTable } from "@/db/schema";
import { useEffect, useState } from "react";

export function UserName({ id }: { id: number }) {
  const [viewerInfo, setViewerInfo] = useState<
    typeof usersTable.$inferSelect | null
  >(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const userData = (await getUser(
          id.toString()
        )) as typeof usersTable.$inferSelect;
        setViewerInfo(userData);
      } catch (error) {
        console.error("Error fetching user:", error);
      }
    };
    setLoading(true);
    fetchUser();
    setLoading(false);
  }, []);

  return (
    <>
      {!loading ? (
        <>{viewerInfo?.name}</>
      ) : (
        <>
          <Skeleton className="w-[100px] h-[20px] rounded-full" />
        </>
      )}
    </>
  );
}
