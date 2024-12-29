"use client";

import { use } from "react";

export default function TestCasesPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = use(params);

  return (
    <div>
      <p>{id}</p>
    </div>
  );
}
