import { MembershipType } from "@/types/member";
import { CheckCircleIcon } from "@heroicons/react/24/outline";
import { XCircleIcon } from "@heroicons/react/24/outline";
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
    accessorKey: "is_active",
    cell: ({ getValue }) => {
      const isActive = getValue<boolean>();
      return (
        <div className="flex items-center gap-2 justify-center">
          {isActive ? (
            <CheckCircleIcon className="h-5 w-5 text-green-500" />
          ) : (
            <XCircleIcon className="h-5 w-5 text-red-500" />
          )}
        </div>
      );
    },
    header: () => <span className="flex justify-center w-full">Active</span>,
  },
];
