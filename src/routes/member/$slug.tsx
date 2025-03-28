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
import { MemberMutationType } from "@/types/member";
import { useMemberships } from "@/queries/memberships";
import Skeleton from "react-loading-skeleton";
import { useMember, useMemberMutation } from "@/queries/members";
import toast from "react-hot-toast";
import { handleDynamicValidationErrors } from "@/utils/validation";
import { useEffect, useState } from "react";
import { QrCodeIcon } from "@heroicons/react/24/solid";
import ModalBarcodeMember from "@/components/shareds/ModalBarcodeMember";

export const Route = createFileRoute("/member/$slug")({
  component: RouteComponent,
});

function RouteComponent() {
  const { slug } = useParams({ strict: false });
  const isEdit = slug !== "add";

  const navigate = useNavigate();

  const [modalBarcode, setModalBarcode] = useState<{
    open: boolean;
    data: null | string;
  }>({
    open: false,
    data: null,
  });

  const { data: dataMemberships, isLoading: isLoadingMembership } =
    useMemberships({ page: 1 });

  const { data: dataMember, isLoading: isLoadingMember } = useMember({
    id: slug || "",
  });

  const {
    control,
    handleSubmit,
    setValue,
    setError,
    formState: { errors },
  } = useForm<MemberMutationType>({
    defaultValues: {
      name: "",
      age: undefined,
      phone_number: "",
      email: "",
      address: "",
      membership_type_id: undefined,
      credit: undefined,
    },
  });

  useEffect(() => {
    if (dataMember) {
      setValue("name", dataMember.name);
      setValue("age", dataMember.age);
      setValue("phone_number", dataMember.phone_number);
      setValue("email", dataMember.email);
      setValue("address", dataMember.address);
      setValue("membership_type_id", dataMember.membership_type.id);
      setValue("credit", dataMember.credit);
    }
  }, [dataMember]);

  const { mutateAsync, isPending } = useMemberMutation({
    onSuccess: () => {
      navigate({ to: "/member" });
      toast.success(`Success ${isEdit ? "Edit" : "Add"} Member`);
    },
    onError: (error) => {
      handleDynamicValidationErrors(error, setError);
    },
  });

  const onSubmit = (data: MemberMutationType) => {
    console.log(data);
    if (dataMember) {
      data.id = dataMember.id;
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
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-semibold mb-4">
            {isEdit ? "Edit Member" : "Add Member"}
          </h2>
          <Button
            icon={<QrCodeIcon className="h-5 w-5" />}
            variant="warning"
            onClick={() =>
              setModalBarcode({
                open: true,
                data: dataMember?.barcode || "",
              })
            }
          >
            Show QR
          </Button>
        </div>
        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-5">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="flex flex-col gap-5">
              <Controller
                name="membership_type_id"
                control={control}
                rules={{
                  required: { value: true, message: "This field is required" },
                }}
                render={({ field: { value, onChange } }) =>
                  isLoadingMembership ? (
                    <div className="flex flex-col">
                      <label className="mb-1 font-medium">
                        Membership Type
                      </label>
                      <Skeleton height={40} />
                    </div>
                  ) : (
                    <Input
                      label="Membership Type"
                      value={value}
                      onChange={onChange}
                      as="select"
                      options={
                        dataMemberships?.results?.map((membership) => ({
                          value: String(membership.id),
                          label: membership.type,
                        })) || []
                      }
                      errors={
                        errors.membership_type_id
                          ? errors.membership_type_id.message
                          : undefined
                      }
                    />
                  )
                }
              />
              <Controller
                name="name"
                control={control}
                rules={{
                  required: { value: true, message: "This field is required" },
                }}
                render={({ field: { value, onChange } }) => (
                  <Input
                    label="Name"
                    value={value}
                    onChange={onChange}
                    errors={errors.name ? errors.name.message : undefined}
                  />
                )}
              />
              <Controller
                name="age"
                control={control}
                rules={{
                  required: { value: true, message: "This field is required" },
                }}
                render={({ field: { value, onChange } }) => (
                  <Input
                    label="Age"
                    value={value}
                    onChange={onChange}
                    errors={errors.age ? errors.age.message : undefined}
                  />
                )}
              />
              <Controller
                name="phone_number"
                control={control}
                rules={{
                  required: { value: true, message: "This field is required" },
                }}
                render={({ field: { value, onChange } }) => (
                  <Input
                    label="Phone Number"
                    value={value}
                    onChange={onChange}
                    errors={
                      errors.phone_number
                        ? errors.phone_number.message
                        : undefined
                    }
                  />
                )}
              />
            </div>
            <div className="flex flex-col gap-5">
              <Controller
                name="email"
                control={control}
                rules={{
                  required: { value: true, message: "This field is required" },
                }}
                render={({ field: { value, onChange } }) => (
                  <Input
                    label="Email"
                    value={value}
                    onChange={onChange}
                    errors={errors.email ? errors.email.message : undefined}
                  />
                )}
              />
              <Controller
                name="address"
                control={control}
                rules={{
                  required: { value: true, message: "This field is required" },
                }}
                render={({ field: { value, onChange } }) => (
                  <Input
                    label="Address"
                    as="textarea"
                    value={value}
                    onChange={onChange}
                    errors={errors.address ? errors.address.message : undefined}
                  />
                )}
              />
              <Controller
                name="credit"
                control={control}
                rules={{
                  required: { value: true, message: "This field is required" },
                }}
                render={({ field: { value, onChange } }) => (
                  <Input
                    label="Credit"
                    value={value}
                    onChange={onChange}
                    errors={errors.credit ? errors.credit.message : undefined}
                  />
                )}
              />
            </div>
          </div>
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
          <ModalBarcodeMember
            data={modalBarcode.data}
            open={modalBarcode.open}
            onClose={() => setModalBarcode({ open: false, data: null })}
          />
        </form>
      </Card>
    </Layout>
  );
}
