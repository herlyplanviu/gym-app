/* eslint-disable react-hooks/exhaustive-deps */
import {
  createFileRoute,
  useNavigate,
  useParams,
} from "@tanstack/react-router";
import Layout from "@/components/Layout";
import Card from "@/components/Card";
import Navbar from "@/components/Navbar";
import Input from "@/components/Input";
import Button from "@/components/Button";
import { useForm, Controller } from "react-hook-form";
import { MembershipMutationType } from "@/types/member";
import { useMembership, useMembershipMutation } from "@/queries/memberships";
import Skeleton from "react-loading-skeleton";
import toast from "react-hot-toast";
import { handleDynamicValidationErrors } from "@/utils/validation";
import { useEffect } from "react";

export const Route = createFileRoute("/membership/$slug")({
  component: RouteComponent,
});

function RouteComponent() {
  const { slug } = useParams({ strict: false });
  const isEdit = slug !== "add";

  const navigate = useNavigate();

  const { data: dataMembership, isLoading: isLoadingMember } = useMembership({
    id: slug || "",
  });

  const {
    control,
    handleSubmit,
    setValue,
    setError,
    formState: { errors },
  } = useForm<MembershipMutationType>({
    defaultValues: {
      type: "",
      description: "",
      is_active: true,
    },
  });

  useEffect(() => {
    if (dataMembership) {
      setValue("type", dataMembership.type);
      setValue("description", dataMembership.description);
      setValue("is_active", dataMembership.is_active);
    }
  }, [dataMembership]);

  const { mutateAsync, isPending } = useMembershipMutation({
    onSuccess: () => {
      navigate({ to: "/membership" });
      toast.success(`Success ${isEdit ? "Edit" : "Add"} Membership`);
    },
    onError: (error) => {
      handleDynamicValidationErrors(error, setError);
    },
  });

  const onSubmit = (data: MembershipMutationType) => {
    console.log(data);
    if (dataMembership) {
      data.id = dataMembership.id;
    }
    mutateAsync(data);
  };

  if (isLoadingMember) {
    return (
      <Layout title={isEdit ? "Edit Member" : "Add Member"}>
        <Navbar />
        <Card>
          <h2 className="text-xl font-semibold mb-4">
            {isEdit ? "Edit Member" : "Add Member"}
          </h2>
          <Skeleton />
        </Card>
      </Layout>
    );
  }

  return (
    <Layout title={isEdit ? "Edit Member" : "Add Member"}>
      <Navbar />
      <Card>
        <h2 className="text-xl font-semibold mb-4">
          {isEdit ? "Edit Member" : "Add Member"}
        </h2>
        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-5">
          <Controller
            name="type"
            control={control}
            rules={{
              required: { value: true, message: "This field is required" },
            }}
            render={({ field: { value, onChange } }) => (
              <Input
                label="Type"
                value={value}
                onChange={onChange}
                errors={errors.type ? errors.type.message : undefined}
              />
            )}
          />
          <Controller
            name="description"
            control={control}
            rules={{
              required: { value: true, message: "This field is required" },
            }}
            render={({ field: { value, onChange } }) => (
              <Input
                label="Description"
                as="textarea"
                value={value}
                onChange={onChange}
                errors={
                  errors.description ? errors.description.message : undefined
                }
              />
            )}
          />
          <div className="flex gap-2">
            <Button type="submit" className="w-fit" loading={isPending}>
              Save
            </Button>
            <Button
              className="w-fit"
              onClick={() => navigate({ to: "/member" })}
              variant="text"
            >
              Cancel
            </Button>
          </div>
        </form>
      </Card>
    </Layout>
  );
}
