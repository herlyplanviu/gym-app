import { MemberType } from "@/types/member";
import { formatDate } from "@/utils/date";
import { ColumnDef } from "@tanstack/react-table";

export const memberColumns = ({
  onClickBarcode,
}: {
  onClickBarcode: (data: string) => void;
}): ColumnDef<MemberType>[] => [
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
    cell: ({ getValue }) => {
      const barcode = getValue<string>();
      return (
        <div className="flex items-center gap-2">
          <div
            onClick={() => onClickBarcode(barcode)}
            className="text-blue-500 hover:underline cursor-pointer"
          >
            <span>{barcode}</span>
          </div>
        </div>
      );
    },
  },
  {
    header: "Phone Number",
    accessorKey: "phone_number",
  },
  {
    header: "Credit",
    accessorKey: "credit",
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
    header: "Credit",
    accessorKey: "credit",
  },
  {
    header: "Expiry",
    accessorKey: "expiry",
    accessorFn: (row) => formatDate(row.expiry),
  },
];
