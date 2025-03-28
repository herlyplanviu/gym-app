/* eslint-disable @typescript-eslint/no-explicit-any */
import toast from "react-hot-toast";

import type { ErrorResponse } from "@/types/response";

export const handleDynamicValidationErrors = (
  error: ErrorResponse,
  setError: any
) => {
  console.log("ERR", error);

  if (!error.data.detail) {
    const fieldMappings = Object.keys(error.data); // Dynamic fields from error.data

    // Loop through all dynamic fields and set errors if they're arrays
    fieldMappings.forEach((field) => {
      if (Array.isArray(error.data[field])) {
        setError(field, {
          type: "manual",
          message: error.data[field], // Directly pass the array as the error message
        });
      }
    });
  } else {
    toast.error(error.detail); // If there are no field-specific errors, show the detail
  }
};
