import { createFileRoute } from "@tanstack/react-router";
import Table from "../components/Table";
import { ColumnDef } from "@tanstack/react-table";
import Navbar from "../components/Navbar";
import Layout from "../components/Layout";
import Button from "../components/Button";
import { QrCodeIcon } from "@heroicons/react/24/outline";
import Card from "../components/Card";

interface AttendanceData {
  name: string;
  checkInTime: string;
}

export const Route = createFileRoute("/")({
  component: Dashboard,
});

function Dashboard() {
  const attendanceData: AttendanceData[] = [
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

  const expiringMembersData = [
    { name: "Alice Johnson", expirationDate: "2023-10-15" },
    { name: "Bob Brown", expirationDate: "2023-10-20" },
  ];

  const attendanceColumns: ColumnDef<AttendanceData>[] = [
    { header: "Name", accessorKey: "name" },
    { header: "Check-in Time", accessorKey: "checkInTime" },
  ];

  const expiringMembersColumns: ColumnDef<{
    name: string;
    expirationDate: string;
  }>[] = [
    { header: "Name", accessorKey: "name" },
    { header: "Expiration Date", accessorKey: "expirationDate" },
  ];

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
      <Card>
        <h2 className="text-xl font-semibold mb-4">Attendance Summary</h2>
        <Table columns={attendanceColumns} data={attendanceData} />
      </Card>
      <Card>
        <h2 className="text-xl font-semibold mb-4">Members Expiring Soon</h2>
        <Table columns={expiringMembersColumns} data={expiringMembersData} />
      </Card>
    </Layout>
  );
}
