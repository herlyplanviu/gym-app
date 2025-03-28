import { request } from "@/utils/request";
import { useQuery } from "@tanstack/react-query";
import { PaginationResponse } from "@/types/response";
import { MemberType } from "@/types/member";

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
