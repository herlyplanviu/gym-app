import { createFileRoute } from "@tanstack/react-router";
import { ColumnDef } from "@tanstack/react-table";
import { useState } from "react";
import Card from "../components/Card";
import Layout from "../components/Layout";
import Navbar from "../components/Navbar";
import Table from "../components/Table";

export const Route = createFileRoute("/member")({
  component: RouteComponent,
});

interface MemberData {
  name: string;
  checkInTime: string;
}

function RouteComponent() {
  const [pagination, setPagination] = useState({
    pageIndex: 0, //initial page index
    pageSize: 10, //default page size
  });

  const memberData: MemberData[] = [
    { name: "John Doe", checkInTime: "10:00 AM" },
    { name: "Jane Smith", checkInTime: "10:05 AM" },
    { name: "John Doe", checkInTime: "10:00 AM" },
    { name: "Jane Smith", checkInTime: "10:05 AM" },
    { name: "John Doe", checkInTime: "10:00 AM" },
    { name: "Jane Smith", checkInTime: "10:05 AM" },
    { name: "John Doe", checkInTime: "10:00 AM" },
    { name: "Jane Smith", checkInTime: "10:05 AM" },
    { name: "John Doe", checkInTime: "10:00 AM" },
    { name: "Jane Smith", checkInTime: "10:05 AM" },
    { name: "John Doe", checkInTime: "10:00 AM" },
    { name: "Jane Smith", checkInTime: "10:05 AM" },
    { name: "John Doe", checkInTime: "10:00 AM" },
    { name: "Jane Smith", checkInTime: "10:05 AM" },
    { name: "John Doe", checkInTime: "10:00 AM" },
    { name: "Jane Smith", checkInTime: "10:05 AM" },
    { name: "John Doe", checkInTime: "10:00 AM" },
    { name: "Jane Smith", checkInTime: "10:05 AM" },
    { name: "John Doe", checkInTime: "10:00 AM" },
    { name: "Jane Smith", checkInTime: "10:05 AM" },
    { name: "John Doe", checkInTime: "10:00 AM" },
    { name: "Jane Smith", checkInTime: "10:05 AM" },
    { name: "John Doe", checkInTime: "10:00 AM" },
    { name: "Jane Smith", checkInTime: "10:05 AM" },
  ];

  // Slice the data manually for pagination
  const paginatedData = memberData.slice(
    pagination.pageIndex * pagination.pageSize,
    (pagination.pageIndex + 1) * pagination.pageSize
  );

  const memberColumns: ColumnDef<MemberData>[] = [
    { header: "Name", accessorKey: "name" },
    { header: "Check-in Time", accessorKey: "checkInTime" },
  ];

  return (
    <Layout title={"Dashboard"}>
      <Navbar />
      <Card>
        <h2 className="text-xl font-semibold mb-4">Member Data</h2>
        <Table
          columns={memberColumns}
          data={paginatedData}
          rowCount={memberData.length}
          pagination={pagination}
          setPagination={setPagination}
          isLoading
        />
      </Card>
    </Layout>
  );
}
