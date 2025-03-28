import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import Card from "@/components/Card";
import Layout from "@/components/Layout";
import Navbar from "@/components/Navbar";
import Table from "@/components/Table";
import Input from "@/components/Input";
import Button from "@/components/Button";
import { PlusIcon } from "@heroicons/react/24/solid";
import useDebounce from "@/hooks/debounce";
import { useMembers } from "@/queries/members";
import { memberColumns } from "@/columns/member-column";
import { PencilSquareIcon } from "@heroicons/react/24/outline";
import ModalBarcodeMember from "@/components/shareds/ModalBarcodeMember";

export const Route = createFileRoute("/member/")({
  component: RouteComponent,
});

function RouteComponent() {
  const navigate = useNavigate();

  const [pagination, setPagination] = useState({
    pageIndex: 0, //initial page index
    pageSize: 10, //default page size
  });
  const [search, setSearch] = useState("");
  const searchDebounce = useDebounce(search);

  const [modalBarcode, setModalBarcode] = useState<{
    open: boolean;
    data: null | string;
  }>({
    open: false,
    data: null,
  });

  const { data, isLoading, isFetching } = useMembers({
    page: pagination.pageIndex + 1,
    search: searchDebounce,
  });

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
          columns={memberColumns({
            onClickBarcode: (data) => setModalBarcode({ open: true, data }),
          })}
          data={data?.results || []}
          rowCount={data?.count || 0}
          pagination={pagination}
          setPagination={setPagination}
          isLoading={isLoading || isFetching}
          edit={(row) => {
            return (
              <PencilSquareIcon
                className="h-5 w-5 cursor-pointer"
                onClick={() => navigate({ to: `/member/${row.original.id}` })}
              />
            );
          }}
        />
        <ModalBarcodeMember
          open={modalBarcode.open}
          onClose={() => setModalBarcode({ open: false, data: null })}
          data={modalBarcode.data}
        />
      </Card>
    </Layout>
  );
}
