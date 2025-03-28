import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { ColumnDef } from "@tanstack/react-table";
import { useEffect, useState } from "react";
import Card from "../../components/Card";
import Layout from "../../components/Layout";
import Navbar from "../../components/Navbar";
import Table from "../../components/Table";
import Input from "../../components/Input";
import Button from "../../components/Button";
import { PlusIcon } from "@heroicons/react/24/solid";
import useDebounce from "../../hooks/debounce";

export const Route = createFileRoute("/member/")({
  component: RouteComponent,
});

interface MemberData {
  name: string;
  checkInTime: string;
}

function RouteComponent() {
  const navigate = useNavigate();

  const [pagination, setPagination] = useState({
    pageIndex: 0, //initial page index
    pageSize: 10, //default page size
  });
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const searchDebounce = useDebounce(search, 300);

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

  useEffect(() => {
    setLoading(true);
    const timer = setTimeout(() => {
      setLoading(false);
    }, 1000);
    return () => clearTimeout(timer);
  }, [pagination]);

  console.log(searchDebounce);

  return (
    <Layout title={"Member"}>
      <Navbar />
      <Card>
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold">Member Data</h2>
          <div className="flex gap-2">
            <Input
              placeholder="Search members..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
            <Button
              onClick={() => navigate({ to: "/member/add" as string })}
              icon={<PlusIcon className="h-5 w-5" />}
            >
              Add
            </Button>
          </div>
        </div>
        <Table
          columns={memberColumns}
          data={paginatedData}
          rowCount={memberData.length}
          pagination={pagination}
          setPagination={setPagination}
          isLoading={loading}
        />
      </Card>
    </Layout>
  );
}
