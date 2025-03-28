import { request } from "@/utils/request";
import { useQuery } from "@tanstack/react-query";
import { AttendanceType } from "@/types/attendance";
import { PaginationResponse } from "@/types/response";

export const useAttendances = ({ page }: { page: number }) => {
  const query = useQuery<PaginationResponse<AttendanceType>>({
    queryKey: ["attendances", page],
    queryFn: () => {
      return new Promise((resolve, reject) => {
        request({
          method: "GET",
          urlKey: "attendance/",
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

export const useAttendancesByDate = ({
  page,
  date,
}: {
  page: number;
  date: string;
}) => {
  const query = useQuery<PaginationResponse<AttendanceType>>({
    queryKey: ["attendances-date", page, date],
    queryFn: () => {
      return new Promise((resolve, reject) => {
        request({
          method: "GET",
          urlKey: "attendance/",
          params: {
            page,
            date,
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
