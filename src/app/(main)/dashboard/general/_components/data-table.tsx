"use client";

import * as React from "react";
import { z } from "zod";

import { useDataTableInstance } from "@/hooks/use-data-table-instance";

import { DataTable as DataTableNew } from "../../../../../components/data-table/data-table";
import { DataTablePagination } from "../../../../../components/data-table/data-table-pagination";
import { DataTableViewOptions } from "../../../../../components/data-table/data-table-view-options";
import { withDndColumn } from "../../../../../components/data-table/table-utils";

import { dashboardColumns } from "./columns";
import { sectionSchema } from "./schema";

export function DataTable({ 
  data: initialData, 
  isLoading = false, 
  error = null 
}: { 
  data: z.infer<typeof sectionSchema>[];
  isLoading?: boolean;
  error?: string | null;
}) {
  const [data, setData] = React.useState(() => initialData);
  const columns = withDndColumn(dashboardColumns);
  const table = useDataTableInstance({ data, columns, getRowId: (row) => row.id.toString() });

  React.useEffect(() => {
    setData(initialData);
  }, [initialData]);

  if (error) {
    return (
      <div className="w-full flex flex-col gap-4">
        <div className="flex items-center justify-center p-8 text-destructive">
          Error loading client meetings: {error}
        </div>
      </div>
    );
  }

  if (isLoading) {
    return (
      <div className="w-full flex flex-col gap-4">
        <div className="flex items-center justify-center p-8">
          Loading client meetings...
        </div>
      </div>
    );
  }

  return (
    <div className="w-full flex flex-col gap-4">
      <div className="flex items-center justify-end">
        <DataTableViewOptions table={table} />
      </div>
      <div className="overflow-hidden rounded-lg border">
        <DataTableNew dndEnabled table={table} columns={columns} onReorder={setData} />
      </div>
      <DataTablePagination table={table} />
    </div>
  );
}
