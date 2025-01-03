"use client";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { experimentRunsTable } from "@/db/schema";
import { ColumnDef } from "@tanstack/react-table";
import { MoreHorizontal } from "lucide-react";

export const ExperimentRunColumns: ColumnDef<
  typeof experimentRunsTable.$inferSelect
>[] = [
  {
    accessorKey: "id",
    header: "ID",
  },
  {
    accessorKey: "experimentFrom",
    header: "Experiment From",
  },
  {
    accessorKey: "percentage",
    header: "Percentage",
  },
  {
    accessorKey: "aggregateScore",
    header: "Aggregate Score",
  },
  {
    accessorKey: "updated",
    header: "Updated",
    cell: ({ row }) => {
      return new Date(row.getValue("updated")).toLocaleString();
    },
  },
  {
    id: "actions",
    cell: ({ row }) => {
      const payment = row.original;

      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="h-8 w-8 p-0">
              <span className="sr-only">Open menu</span>
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>Actions</DropdownMenuLabel>
            <DropdownMenuItem
              onClick={() =>
                navigator.clipboard.writeText(payment.id.toString())
              }
            >
              Copy project ID
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem>View project</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },
];
