import { request } from "@/utils/request";
import { useMutation, useQuery } from "@tanstack/react-query";
import { ErrorResponse, PaginationResponse } from "@/types/response";
import { MembershipMutationType, MembershipType } from "@/types/member";

export const useMemberships = ({ page }: { page: number }) => {
  const query = useQuery<PaginationResponse<MembershipType>>({
    queryKey: ["membership-types", page],
    queryFn: () => {
      return new Promise((resolve, reject) => {
        request({
          method: "GET",
          urlKey: "membership-types/",
          params: {
            page,
          },
          onSuccess: resolve,
          onFailed: reject,
        });
      });
    },
    retry: false,
    refetchOnWindowFocus: false,
    placeholderData: (prev) => prev,
  });

  return query;
};

export const useMembership = ({ id }: { id: string | number }) => {
  const query = useQuery<MembershipType>({
    queryKey: ["membership-type", id],
    queryFn: () => {
      return new Promise((resolve, reject) => {
        request({
          method: "GET",
          urlKey: `membership-types/${id}/`,
          onSuccess: resolve,
          onFailed: reject,
        });
      });
    },
    retry: false,
    refetchOnWindowFocus: false,
    enabled: id !== "add",
  });

  return query;
};

export const useMembershipMutation = ({
  onSuccess,
  onError,
}: {
  onSuccess: () => void;
  onError: (error: ErrorResponse) => void;
}) => {
  const mutation = useMutation({
    mutationFn: (data: MembershipMutationType) => {
      return new Promise((resolve, reject) => {
        request({
          method: data.id ? "PATCH" : "POST",
          urlKey: data.id
            ? `membership-types/${data.id}/`
            : "membership-types/",
          data: {
            ...data,
            id: undefined,
          },
          onSuccess: resolve,
          onFailed: reject,
        });
      });
    },
    onSuccess: onSuccess,
    onError: onError,
  });

  return mutation;
};
