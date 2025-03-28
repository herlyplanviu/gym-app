import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import Card from "@/components/Card";
import Layout from "@/components/Layout";
import Navbar from "@/components/Navbar";
import Table from "@/components/Table";
import Button from "@/components/Button";
import { PencilSquareIcon, PlusIcon } from "@heroicons/react/24/outline";
import { membershipColumns } from "@/columns/membership-column";
import { useMemberships } from "@/queries/memberships";

export const Route = createFileRoute("/membership/")({
  component: RouteComponent,
});

function RouteComponent() {
  const navigate = useNavigate();

  const [pagination, setPagination] = useState({
    pageIndex: 0, //initial page index
    pageSize: 10, //default page size
  });

  const { data, isLoading, isFetching } = useMemberships({
    page: pagination.pageIndex + 1,
  });

  return (
    <Layout title={"Member"}>
      <Navbar />
      <Card>
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold">Member Data</h2>
          <div className="flex gap-2">
            <Button
              onClick={() => navigate({ to: "/membership/add" as string })}
              icon={<PlusIcon className="h-5 w-5" />}
            >
              Add
            </Button>
          </div>
        </div>
        <Table
          columns={membershipColumns}
          data={data?.results || []}
          rowCount={data?.count || 0}
          pagination={pagination}
          setPagination={setPagination}
          isLoading={isLoading || isFetching}
          edit={(row) => {
            return (
              <PencilSquareIcon
                className="h-5 w-5 cursor-pointer"
                onClick={() =>
                  navigate({ to: `/membership/${row.original.id}` })
                }
              />
            );
          }}
        />
      </Card>
    </Layout>
  );
}
