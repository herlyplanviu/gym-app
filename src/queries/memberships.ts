import { request } from "@/utils/request";
import { useQuery } from "@tanstack/react-query";
import { PaginationResponse } from "@/types/response";
import { MembershipType } from "@/types/member";

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
