import { createFileRoute } from "@tanstack/react-router";
import Table from "@/components/Table";
import Navbar from "@/components/Navbar";
import Layout from "@/components/Layout";
import Button from "@/components/Button";
import { QrCodeIcon } from "@heroicons/react/24/outline";
import Card from "@/components/Card";
import { useState } from "react";
import { useAttendancesByDate } from "@/queries/attendances";
import { attendanceColumns } from "@/columns/attendance-column";
import moment from "moment";
import { useLowCreditMembers } from "@/queries/members";
import { lowMemberColumns } from "@/columns/member-column";

export const Route = createFileRoute("/")({
  component: Dashboard,
});

function Dashboard() {
  const now = moment().format("YYYY-MM-DD");

  const [pagination, setPagination] = useState({
    pageIndex: 0, //initial page index
    pageSize: 10, //default page size
  });

  const [paginationLow, setPaginationLow] = useState({
    pageIndex: 0, //initial page index
    pageSize: 10, //default page size
  });

  const { data: dataAttendances, isLoading: isLoadingAttendance } =
    useAttendancesByDate({
      page: pagination.pageIndex + 1,
      date: now,
    });

  const { data: dataLows, isLoading: isLoadingLow } = useLowCreditMembers({
    page: paginationLow.pageIndex + 1,
  });

  return (
    <Layout title={"Dashboard"}>
      <Navbar />
      <div className="mb-6">
        <Button
          onClick={() => console.log("Scan QR Code")}
          className="bg-green-500 hover:bg-green-600"
          icon={<QrCodeIcon className="h-5 w-5" />}
        >
          Scan QR
        </Button>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Card>
          <h2 className="text-xl font-semibold mb-4">Attendance Summary</h2>
          <Table
            columns={attendanceColumns}
            data={dataAttendances?.results || []}
            rowCount={dataAttendances?.count || 0}
            pagination={pagination}
            setPagination={setPagination}
            isLoading={isLoadingAttendance}
          />
        </Card>
        <Card>
          <h2 className="text-xl font-semibold mb-4">Members Expiring Soon</h2>
          <Table
            columns={lowMemberColumns}
            data={dataLows?.results || []}
            rowCount={dataLows?.count || 0}
            pagination={paginationLow}
            setPagination={setPaginationLow}
            isLoading={isLoadingLow}
          />
        </Card>
      </div>
    </Layout>
  );
}
