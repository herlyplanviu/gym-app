import { AttendanceType } from "@/types/attendance";
import { formatDate } from "@/utils/date";
import { ColumnDef } from "@tanstack/react-table";

export const attendanceColumns: ColumnDef<AttendanceType>[] = [
  {
    header: "Name",
    accessorKey: "member.name",
  },
  {
    header: "Datetime",
    accessorKey: "timestamp",
    accessorFn: (row) => formatDate(row.timestamp),
  },
];
