import { createFileRoute } from "@tanstack/react-router";
import Table from "@/components/Table";
import Navbar from "@/components/Navbar";
import Layout from "@/components/Layout";
import Button from "@/components/Button";
import { QrCodeIcon } from "@heroicons/react/24/outline";
import Card from "@/components/Card";
import { RefObject, useRef, useState } from "react";
import { useAttendancesByDate, useScanQr } from "@/queries/attendances";
import { attendanceColumns } from "@/columns/attendance-column";
import moment from "moment";
import { useLowCreditMembers } from "@/queries/members";
import { lowMemberColumns } from "@/columns/member-column";
import Modal from "@/components/Modal";
import Input from "@/components/Input";
import toast from "react-hot-toast";

export const Route = createFileRoute("/")({
  component: Dashboard,
});

function Dashboard() {
  const refInput = useRef<HTMLInputElement>(null);
  const [modal, setModal] = useState(false);
  const [valueBarcode, setValueBarcode] = useState("");
  const [msgScan, setMsgScan] = useState<null | string>(null);
  const now = moment().format("YYYY-MM-DD");

  const [pagination, setPagination] = useState({
    pageIndex: 0, //initial page index
    pageSize: 10, //default page size
  });

  const [paginationLow, setPaginationLow] = useState({
    pageIndex: 0, //initial page index
    pageSize: 10, //default page size
  });

  const {
    data: dataAttendances,
    isLoading: isLoadingAttendance,
    isFetching: isFetchingAttendance,
  } = useAttendancesByDate({
    page: pagination.pageIndex + 1,
    date: now,
  });

  const {
    data: dataLows,
    isLoading: isLoadingLow,
    isFetching: isFetchingLow,
  } = useLowCreditMembers({
    page: paginationLow.pageIndex + 1,
  });

  const { mutateAsync, isPending } = useScanQr({
    onSuccess: (member) => {
      setValueBarcode("");
      setMsgScan(
        `Member ${member.member.name} (${member.member.barcode}) successfully attended at ${moment(member.attendance.timestamp).format("MMMM Do YYYY, h:mm")}`
      );
      toast.success(member.message);
    },
    onError: (error) => {
      setMsgScan("");
      toast.error(error.data.error);
    },
  });

  return (
    <Layout title={"Dashboard"}>
      <Navbar />
      <div className="mb-6">
        <Button
          onClick={() => setModal(true)}
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
            isLoading={isLoadingAttendance || isFetchingAttendance}
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
            isLoading={isLoadingLow || isFetchingLow}
          />
        </Card>
      </div>
      <Modal
        isOpen={modal}
        onClose={() => setModal(false)}
        title="Scan Barcode"
        disableFooter
      >
        <div className="space-y-4 md:space-y-6">
          {msgScan && (
            <div className="bg-green-700 text-white py-2 px-4 rounded flex justify-between items-center">
              <span className="text-left">{msgScan}</span>
              <button
                onClick={() => setMsgScan("")}
                className="text-white cursor-pointer"
              >
                &times;
              </button>
            </div>
          )}
          <div className="flex justify-between">
            <Input
              value={valueBarcode}
              onChange={(e) => setValueBarcode(() => e.target.value)}
              ref={refInput as RefObject<HTMLInputElement>}
              autoFocus
              onBlur={(e) => {
                if (e.relatedTarget === null) {
                  (e.target as HTMLElement).focus();
                }
              }}
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  e.preventDefault(); // Prevent form resubmission issues
                  mutateAsync({ barcode: valueBarcode });
                  refInput.current?.focus(); // Refocus input for next scan
                }
              }}
            />
            <Button
              className="ml-4"
              icon={<QrCodeIcon className="h-5 w-5" />}
              onClick={() => {
                mutateAsync({ barcode: valueBarcode });
                refInput.current?.focus();
              }}
              loading={isPending}
            >
              Scan
            </Button>
          </div>
        </div>
      </Modal>
    </Layout>
  );
}
