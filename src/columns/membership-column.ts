import { MembershipType } from "@/types/member";
import { ColumnDef } from "@tanstack/react-table";

export const membershipColumns: ColumnDef<MembershipType>[] = [
  {
    header: "Type",
    accessorKey: "type",
  },
  {
    header: "Description",
    accessorKey: "description",
  },
  {
    header: "Active",
    accessorKey: "is_active",
    accessorFn: (row) => (row.is_active ? "Yes" : "No"),
  },
];
