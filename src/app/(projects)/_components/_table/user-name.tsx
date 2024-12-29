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
        setLoading(true);
        const userData = (await getUser(
          id.toString()
        )) as typeof usersTable.$inferSelect;
        setViewerInfo(userData);
      } catch (error) {
        console.error("Error fetching user:", error);
        setViewerInfo(null);
      } finally {
        // eslint-disable-next-line @typescript-eslint/no-non-null-asserted-optional-chain

        setLoading(false);
      }
      // eslint-disable-next-line @typescript-eslint/no-non-null-asserted-optional-chain
    };

    fetchUser();
  }, [id]);
  if (loading) {
    return <Skeleton className="w-[100px] h-[20px] rounded-full" />;
  }
  // eslint-disable-next-line @typescript-eslint/no-non-null-asserted-optional-chain
  return <p>{viewerInfo?.name ?? "User not found"}</p>;
}
