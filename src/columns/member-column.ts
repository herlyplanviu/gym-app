import { MemberType } from "@/types/member";
import { formatDate } from "@/utils/date";
import { ColumnDef } from "@tanstack/react-table";

export const memberColumns: ColumnDef<MemberType>[] = [
  {
    header: "Name",
    accessorKey: "name",
  },
  {
    header: "Email",
    accessorKey: "email",
  },
  {
    header: "Age",
    accessorKey: "age",
  },
  {
    header: "Barcode",
    accessorKey: "barcode",
  },
  {
    header: "Phone Number",
    accessorKey: "phone_number",
  },
  {
    header: "Expiry",
    accessorKey: "expiry",
    accessorFn: (row) => formatDate(row.expiry),
  },
];
