/* eslint-disable @typescript-eslint/no-explicit-any */
import type { AxiosResponse } from "axios";
import axios from "axios";
import { merge, get, noop } from "lodash";

export const URL_API = import.meta.env.VITE_API_URL;

// Define the type for formData handling
function buildFormData(formData: FormData, data: any, parentKey?: any) {
  if (
    data &&
    typeof data === "object" &&
    !(data instanceof Date) &&
    !(data instanceof File)
  ) {
    Object.keys(data).forEach((key: any) => {
      if (Array.isArray(data)) {
        buildFormData(formData, data[key], parentKey ? `${parentKey}` : key);
      } else {
        buildFormData(
          formData,
          data[key],
          parentKey ? `${parentKey}.${key}` : key
        );
      }
    });
  } else {
    const value = data == null ? "" : data;

    formData.append(parentKey, value);
  }
}

export function jsonToFormData(data: any): FormData {
  const formData = new FormData();

  buildFormData(formData, data);

  return formData;
}

function buildUrlWithArgs(url: string, args: (string | number)[]) {
  if (args.length > 0) {
    // Append each argument to the URL
    url += "/" + args.join("/");
  }

  return `${url}`;
}

// Define the types for the options passed to `request`
export interface RequestOptions {
  method: "GET" | "POST" | "PUT" | "DELETE" | "PATCH";
  urlKey?: string | null | undefined;
  url?: string | null;
  baseURL?: string;
  params?: Record<string, any>;
  data?: any;
  accessToken?: string;
  autoRefreshExpiredToken?: boolean;
  useCustomErrorMessage?: boolean;
  returnResultObject?: boolean;
  responseType?: "json" | "blob" | "text" | "arraybuffer" | "stream";
  requestDataType?: "json" | "formData";
  headers?: Record<string, string>;
  withCredentials?: boolean;
  extra?: any;
  onSuccess?: (data: any, extra?: any, rawRes?: AxiosResponse) => void;
  onFailed?: (error: any, extra?: any, rawRes?: AxiosResponse) => void;
  onBoth?: (
    success: boolean,
    data: any,
    extra?: any,
    rawRes?: AxiosResponse
  ) => void;
  onBefore?: (options: RequestOptions) => void;
  onUploadProgress?: (progressEvent: ProgressEvent<EventTarget>) => void;
  onDownloadProgress?: (progressEvent: ProgressEvent<EventTarget>) => void;
}

// Define the shape of the response error object
interface ErrorResponse {
  success: boolean;
  message: string | null;
  data: any | null;
}

// Handle different error statuses
const ERROR_BY_STATUSES: Record<number | string, string> = {
  400: "Data sent is invalid",
  401: "Session expired",
  403: "You do not have permission to perform this action.",
  404: "Request Data Not Found",
  405: "Method Not Allowed",
  408: "Request Timeout",
  500: "Internal Server Error, please try again later.",
  offline: "Fail connecting to server, please try again",
  default: "Failed to fetch, please contact your admin!",
};

async function refreshAccessToken(refreshToken: string): Promise<string> {
  const myHeaders = new Headers();

  myHeaders.append("Authorization", `Bearer ${refreshToken}`);

  const requestOptions = {
    method: "POST",
    headers: myHeaders,
    redirect: "follow",
  };

  const response = await fetch(`${URL_API}auth/refresh-token`, {
    method: requestOptions.method,
    headers: requestOptions.headers,
    redirect: requestOptions.redirect as RequestRedirect,
  });

  if (!response.ok) {
    throw new Error("Failed to refresh access token");
  }

  const result = await response.json();

  await localStorage.setItem("session", result.data.accessToken);
  await localStorage.setItem("refresh_token", result.data.refreshToken);

  return result.data.accessToken;
}

// Create axios instance
const axiosInstance = axios.create();

export async function request(
  options: RequestOptions & {
    url?: any;
    default?: any;
    key?: any;
    args?: Array<any>;
  }
) {
  //   const { session } = useSession();
  const token = localStorage.getItem("token");
  // const refreshToken = localStorage.getItem("refresh_token");
  const url = options.urlKey ?? "";
  let resultObj = { success: false, result: null } as any;

  const defOpt: RequestOptions & {
    default?: any;
    key?: any;
    args?: Array<any>;
  } = {
    method: "GET",
    urlKey: null,
    url: null,
    baseURL: URL_API,
    default: null,
    key: null,
    args: [],
    params: undefined,
    data: undefined,
    accessToken: token || "",
    autoRefreshExpiredToken: true,
    useCustomErrorMessage: true,
    returnResultObject: false,
    responseType: "json",
    requestDataType: "json",
    withCredentials: false,
    extra: {},
    onSuccess: noop,
    onFailed: noop,
    onBoth: noop,
    onBefore: noop,
    onUploadProgress: noop,
    onDownloadProgress: noop,
  };

  options = merge(defOpt, options);

  options.headers = {
    ...(options.accessToken
      ? { Authorization: `Bearer ${options.accessToken}` }
      : null),
    ...options.headers,
  };

  if (options.requestDataType === "formData") {
    options.data = jsonToFormData({ ...options.data });
  }

  if (options.method.toUpperCase() === "GET")
    if (!options.params) options.params = options.data;

  options.urlKey = buildUrlWithArgs(url, options.args as any[]);

  options.onBefore?.(options);

  return axiosInstance
    .request({
      method: options.method.toUpperCase(),
      url: options.urlKey as string,
      baseURL: URL_API,
      headers: options.headers,
      params: options.params,
      data: options.data,
      responseType: options.responseType,

      // onDownloadProgress: options.onDownloadProgress,
      // onUploadProgress: options.onUploadProgress,
      withCredentials: options.withCredentials,
    })
    .then((rawRes: AxiosResponse) => {
      options.onSuccess?.(rawRes.data, options.extra, rawRes);
      options.onBoth?.(true, rawRes.data, options.extra, rawRes);

      resultObj = {
        success: true,
        result: rawRes.data,
        extra: options.extra as any,
        response: rawRes,
        key: options.key || options.urlKey,
      };

      return !options.returnResultObject ? rawRes.data : resultObj;
    })
    .catch(async (err: any): Promise<any> => {
      const resErrObj: ErrorResponse = {
        success: false,
        message: null,
        data: null,
      };
      const isResolved = true;

      if (!token) {
        // return await signou()
      }

      if (err.response) {
        resErrObj.success = false;
        resErrObj.message =
          ERROR_BY_STATUSES[err.response.status] ||
          ERROR_BY_STATUSES["default"];
        resErrObj.data = err.response.data;

        if (err.response.status >= 300 && err.response.status < 500) {
          // Handle token refresh on 401 error
          if (err.response.status === 401 && options.autoRefreshExpiredToken) {
            try {
              // Refresh token
              const newToken = await refreshAccessToken(token || "");

              // Retry the original request with the new token
              options.accessToken = newToken;
              options.headers = {
                ...options.headers,
                Authorization: `Bearer ${newToken}`,
              };

              // Retry the request with new token

              return request(options); // Recursive call with the updated token
            } catch (refreshError) {
              console.error(refreshError);

              // If token refresh fails, sign out the user
              // await signOut()
            }
          } else {
            if (!options.useCustomErrorMessage) {
              resErrObj.message =
                get(err.response, ["message"]) || err.response.data;
            }
          }
        } else if (err.response.status < 300) {
          resErrObj.message = ERROR_BY_STATUSES["offline"];
        }
      } else {
        resErrObj.success = false;
        resErrObj.message = !options.useCustomErrorMessage
          ? err.message
          : ERROR_BY_STATUSES[500];
      }

      if (isResolved) {
        options.onFailed?.(resErrObj, options.extra, err.response);
        options.onBoth?.(false, resErrObj, options.extra, err.response);

        resultObj = {
          success: false,
          result: resErrObj as any,
          extra: options.extra,
          response: err.response,
          key: options.key || options.urlKey,
          default: options.default,
        };

        return !options.returnResultObject ? options.default : resultObj;
      }
    });
}
