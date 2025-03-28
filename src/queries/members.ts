import { request } from "@/utils/request";
import { useMutation, useQuery } from "@tanstack/react-query";
import { ErrorResponse, PaginationResponse } from "@/types/response";
import { MemberMutationType, MemberType } from "@/types/member";

export const useMembers = ({
  page,
  search,
}: {
  page: number;
  search: string;
}) => {
  const query = useQuery<PaginationResponse<MemberType>>({
    queryKey: ["members", page, search],
    queryFn: () => {
      return new Promise((resolve, reject) => {
        request({
          method: "GET",
          urlKey: "members/",
          params: {
            page,
            search,
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

export const useMember = ({ id }: { id: string | number }) => {
  const query = useQuery<MemberType>({
    queryKey: ["member", id],
    queryFn: () => {
      return new Promise((resolve, reject) => {
        request({
          method: "GET",
          urlKey: `members/${id}/`,
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

export const useLowCreditMembers = ({ page }: { page: number }) => {
  const query = useQuery<MemberType[]>({
    queryKey: ["members-low-credit-members", page],
    queryFn: () => {
      return new Promise((resolve, reject) => {
        request({
          method: "GET",
          urlKey: "members/low_credit_members/",
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

export const useMemberMutation = ({
  onSuccess,
  onError,
}: {
  onSuccess: () => void;
  onError: (error: ErrorResponse) => void;
}) => {
  const mutation = useMutation({
    mutationFn: (data: MemberMutationType) => {
      return new Promise((resolve, reject) => {
        request({
          method: data.id ? "PATCH" : "POST",
          urlKey: data.id ? `members/${data.id}/` : "members/",
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
