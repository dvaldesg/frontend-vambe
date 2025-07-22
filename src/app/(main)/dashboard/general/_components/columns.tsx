import { ColumnDef } from "@tanstack/react-table";
import { Badge } from "@/components/ui/badge";
import { Checkbox } from "@/components/ui/checkbox";
import { z } from "zod";
import { sectionSchema } from "./schema";
import { TableCellViewer } from "./table-cell-viewer";
import { DataTableColumnHeader } from "../../../../../components/data-table/data-table-column-header";

type SectionRow = z.infer<typeof sectionSchema>;

export const dashboardColumns: ColumnDef<SectionRow>[] = [
  {
    id: "select",
    header: ({ table }) => (
      <div className="flex items-center justify-center">
        <Checkbox
          checked={table.getIsAllPageRowsSelected() || (table.getIsSomePageRowsSelected() && "indeterminate")}
          onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
          aria-label="Select all"
        />
      </div>
    ),
    cell: ({ row }) => (
      <div className="flex items-center justify-center">
        <Checkbox
          checked={row.getIsSelected()}
          onCheckedChange={(value) => row.toggleSelected(!!value)}
          aria-label="Select row"
        />
      </div>
    ),
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: "name",
    header: ({ column }) => <DataTableColumnHeader column={column} title="Name" />,
    cell: ({ row }) => {
      return <TableCellViewer item={row.original} />;
    },
  },
  {
    accessorKey: "date",
    header: ({ column }) => <DataTableColumnHeader column={column} title="Date" />,
    cell: ({ getValue }) => {
      const date = new Date(getValue() as string);
      return (
        <span className="text-sm text-muted-foreground">
          {date.toLocaleDateString("es-CL", {
            year: "numeric",
            month: "short",
            day: "numeric",
          })}
        </span>
      );
    },
  },
  {
    accessorKey: "salesmanName",
    header: ({ column }) => <DataTableColumnHeader column={column} title="Salesman" />,
    cell: ({ getValue }) => {
      return <span className="font-medium">{getValue() as string}</span>;
    },
  },
  {
    accessorKey: "closed",
    header: ({ column }) => <DataTableColumnHeader column={column} title="Status" />,
    cell: ({ getValue }) => {
      const isClosed = getValue() as boolean;
      return (
        <Badge 
          variant={isClosed ? "default" : "secondary"} 
          className={`font-medium ${isClosed ? "bg-green-500 hover:bg-green-600" : "bg-red-500 hover:bg-red-600 text-white"}`}
        >
          {isClosed ? "Closed" : "Not Closed"}
        </Badge>
      );
    },
  },
];
