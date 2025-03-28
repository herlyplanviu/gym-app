import { request } from "@/utils/request";
import { useMutation, useQuery } from "@tanstack/react-query";
import { AttendaceQrType, AttendanceType } from "@/types/attendance";
import { ErrorResponse, PaginationResponse } from "@/types/response";

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

export const useScanQr = ({
  onSuccess,
  onError,
}: {
  onSuccess: (member: AttendaceQrType) => void;
  onError: (error: ErrorResponse) => void;
}) => {
  const mutation = useMutation({
    mutationFn: (data: { barcode: string }): Promise<AttendaceQrType> => {
      return new Promise((resolve, reject) => {
        request({
          method: "POST",
          urlKey: "members/scan_attendance/",
          data: {
            ...data,
          },
          onSuccess: resolve,
          onFailed: reject,
          useCustomErrorMessage: true,
        });
      });
    },
    onSuccess: onSuccess,
    onError: onError,
  });

  return mutation;
};
