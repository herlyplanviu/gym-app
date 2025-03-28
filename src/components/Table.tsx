// src/components/Table.tsx
import {
  useReactTable,
  ColumnDef,
  flexRender,
  getCoreRowModel,
  getPaginationRowModel,
  OnChangeFn,
  PaginationState,
} from "@tanstack/react-table";
import Skeleton from "react-loading-skeleton";

interface TableProps<T> {
  columns: ColumnDef<T>[];
  data: T[];
  setPagination: OnChangeFn<PaginationState>;
  pagination: PaginationState;
  rowCount: number;
  isLoading?: boolean;
}

const Table = <T,>({
  columns,
  data,
  pagination,
  setPagination,
  rowCount,
  isLoading,
}: TableProps<T>) => {
  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    manualPagination: true,
    getPaginationRowModel: getPaginationRowModel(),
    rowCount,
    onPaginationChange: setPagination,
    state: {
      pagination,
    },
  });

  return (
    <>
      <table className="min-w-full border border-gray-300">
        <thead>
          {table.getHeaderGroups().map((headerGroup) => (
            <tr key={headerGroup.id}>
              {headerGroup.headers.map((column) => (
                <th
                  key={column.id}
                  className="border border-gray-300 bg-gray-100 p-2 text-left" // Added border
                >
                  {flexRender(
                    column.column.columnDef.header,
                    column.getContext()
                  )}
                </th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody>
          {table.getRowModel().rows.length > 0 ? (
            table.getRowModel().rows.map((row) => (
              <tr key={row.id} className="hover:bg-gray-50">
                {row.getVisibleCells().map((cell) => (
                  <td
                    key={cell.id}
                    className="border border-gray-300 p-2" // Added border
                  >
                    {isLoading ? (
                      <Skeleton
                        width={Math.floor(Math.random() * 21) + 50}
                        height={10}
                      />
                    ) : (
                      flexRender(cell.column.columnDef.cell, cell.getContext())
                    )}
                  </td>
                ))}
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan={columns.length} className="text-center p-4">
                No data available
              </td>
            </tr>
          )}
        </tbody>
      </table>
      <div className="h-2" />
      <div className="flex items-center justify-between">
        <span className="flex items-center space-x-2 text-sm font-medium text-gray-700">
          <span>Page</span>
          <span className="px-2 py-1 bg-gray-100 border border-gray-300 rounded-md text-gray-900">
            {table.getState().pagination.pageIndex + 1}
          </span>
          <span>of</span>
          <span className="px-2 py-1 bg-gray-100 border border-gray-300 rounded-md text-gray-900">
            {table.getPageCount().toLocaleString()}
          </span>
        </span>

        <div className="flex items-center gap-2">
          <button
            className="px-3 py-1 rounded-md border border-gray-300 bg-gray-100 hover:bg-gray-200 disabled:opacity-50 disabled:cursor-not-allowed"
            onClick={() => table.firstPage()}
            disabled={!table.getCanPreviousPage()}
          >
            {"<<"}
          </button>
          <button
            className="px-3 py-1 rounded-md border border-gray-300 bg-gray-100 hover:bg-gray-200 disabled:opacity-50 disabled:cursor-not-allowed"
            onClick={() => table.previousPage()}
            disabled={!table.getCanPreviousPage()}
          >
            {"<"}
          </button>
          <button
            className="px-3 py-1 rounded-md border border-gray-300 bg-gray-100 hover:bg-gray-200 disabled:opacity-50 disabled:cursor-not-allowed"
            onClick={() => table.nextPage()}
            disabled={!table.getCanNextPage()}
          >
            {">"}
          </button>
          <button
            className="px-3 py-1 rounded-md border border-gray-300 bg-gray-100 hover:bg-gray-200 disabled:opacity-50 disabled:cursor-not-allowed"
            onClick={() => table.lastPage()}
            disabled={!table.getCanNextPage()}
          >
            {">>"}
          </button>
        </div>
      </div>
    </>
  );
};

export default Table;
