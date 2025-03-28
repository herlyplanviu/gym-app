import { MemberType } from "@/types/member";
import { formatDate } from "@/utils/date";
import { ColumnDef } from "@tanstack/react-table";

export const memberColumns: ColumnDef<MemberType>[] = [
  {
    header: "Membership",
    accessorKey: "membership_type.type",
  },
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
    header: "Credit",
    accessorKey: "credit",
    cell: (info) => info.getValue(),
    meta: {
      textAlign: "center",
    },
  },
  {
    header: "Expiry",
    accessorKey: "expiry",
    accessorFn: (row) => formatDate(row.expiry),
  },
];

export const lowMemberColumns: ColumnDef<MemberType>[] = [
  {
    header: "Membership",
    accessorKey: "membership_type.type",
  },
  {
    header: "Name",
    accessorKey: "name",
  },
  {
    header: "Expiry",
    accessorKey: "expiry",
    accessorFn: (row) => formatDate(row.expiry),
  },
];
