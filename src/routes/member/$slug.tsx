import { createFileRoute, useParams } from "@tanstack/react-router";
import Layout from "@/components/Layout";
import Card from "@/components/Card";
import Navbar from "@/components/Navbar";

export const Route = createFileRoute("/member/$slug")({
  component: RouteComponent,
});

function RouteComponent() {
  const { slug } = useParams({ strict: false });
  const isEdit = slug !== "add";
  return (
    <Layout title={isEdit ? "Edit Member" : "Add Member"}>
      <Navbar />
      <Card>
        <h2 className="text-xl font-semibold mb-4">
          {isEdit ? "Edit Member" : "Add Member"}
        </h2>
        <h1>omke gas</h1>
      </Card>
    </Layout>
  );
}
