import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import Card from "@/components/Card";
import Layout from "@/components/Layout";
import Navbar from "@/components/Navbar";
import Table from "@/components/Table";
import Input from "@/components/Input";
import Button from "@/components/Button";
import { ArrowPathIcon } from "@heroicons/react/24/solid";
import { useAttendancesByDate } from "@/queries/attendances";
import moment from "moment";
import { attendanceColumns } from "@/columns/attendance-column";
import { useQueryClient } from "@tanstack/react-query";

export const Route = createFileRoute("/attendance")({
  component: RouteComponent,
});

function RouteComponent() {
  const queryClient = useQueryClient();

  const [pagination, setPagination] = useState({
    pageIndex: 0, //initial page index
    pageSize: 10, //default page size
  });

  const now = moment().format("YYYY-MM-DD");

  const [date, setDate] = useState(now);

  const { data, isLoading, isFetching } = useAttendancesByDate({
    page: pagination.pageIndex + 1,
    date: date,
  });

  const refetch = async () => {
    await queryClient.refetchQueries({
      queryKey: ["attendances-date", pagination.pageIndex + 1, date],
    });
  };

  return (
    <Layout title={"Attendance"}>
      <Navbar />
      <Card>
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold">Attendance Data</h2>
          <div className="flex gap-2">
            <Button
              onClick={() => refetch()}
              icon={<ArrowPathIcon className="h-5 w-5" />}
            >
              Refresh
            </Button>
            <Input
              type="date"
              placeholder="Search members..."
              value={date}
              onChange={(e) => setDate(e.target.value)}
            />
          </div>
        </div>
        <Table
          columns={attendanceColumns}
          data={data?.results || []}
          rowCount={data?.count || 0}
          pagination={pagination}
          setPagination={setPagination}
          isLoading={isLoading || isFetching}
        />
      </Card>
    </Layout>
  );
}
