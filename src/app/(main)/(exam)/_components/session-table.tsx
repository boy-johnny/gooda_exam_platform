"use client";

import Link from "next/link";
import {
  ColumnDef,
  ColumnFiltersState,
  SortingState,
  VisibilityState,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table";

import {
  ArrowUpDown,
  ChevronDown,
  Columns3,
  RefreshCcw,
  SearchIcon,
} from "lucide-react";
import * as React from "react";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import SessionTabs from "./session-tabs";

const data: Test[] = [
  {
    id: "3e237b9a-6061-40cd-9b25-ef092c60fc84",
    subject_id: "d43c59c4-e0f4-42e6-b6e4-52e55f0d6647",
    name: "113-1-生物化學",
    year: 113,
    period: 1,
    question_count: 80, // Assuming a value for display
  },
  {
    id: "697d9a2e-51a5-411a-bb16-43bd69f6e26a",
    subject_id: "d43c59c4-e0f4-42e6-b6e4-52e55f0d6647",
    name: "112-2-生物化學",
    year: 112,
    period: 2,
    question_count: 80,
  },
  {
    id: "b498f824-530d-4e60-94d0-d49fe1ea05e6",
    subject_id: "a1b2c3d4-e5f6-7890-ghij-klemno123456", // Different subject
    name: "112-1-微生物學",
    year: 112,
    period: 1,
    question_count: 80,
  },
];

export type Test = {
  id: string; // e.g., "3e237b9a-6061-40cd-9b25-ef092c60fc84"
  subject_id: string; // e.g., "d43c59c4-e0f4-42e6-b6e4-52e55f0d6647"
  name: string; // e.g., "113-2-生物化學"
  year: number; // e.g., 113
  period: number; // e.g., 1
  question_count?: number; // Optional, as it can be null
};

export const columns: ColumnDef<Test>[] = [
  {
    accessorKey: "year",
    header: ({ column }) => (
      <Button
        variant="ghost"
        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
      >
        年度
        <ArrowUpDown className="ml-2 h-4 w-4" />
      </Button>
    ),
    cell: ({ row }) => <div>{row.getValue("year")}</div>,
  },
  {
    accessorKey: "period",
    header: ({ column }) => (
      <Button
        variant="ghost"
        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
      >
        期數
        <ArrowUpDown className="ml-2 h-4 w-4" />
      </Button>
    ),
    cell: ({ row }) => (
      <div className="text-center">{row.getValue("period")}</div>
    ),
  },
  {
    accessorKey: "name",
    header: "測驗名稱",
    cell: ({ row }) => (
      <div className="font-medium">{row.getValue("name")}</div>
    ),
  },
  {
    id: "actions",
    header: () => <div className="text-right pr-4">操作</div>,
    cell: ({ row }) => {
      const test = row.original;

      return (
        <div className="flex justify-end gap-2">
          <Link href={`/test/${test.id}?mode=simulation`}>
            <Button variant="default" size="sm">
              模擬測驗
            </Button>
          </Link>
          <Link href={`/test/${test.id}?mode=practice`}>
            <Button variant="outline" size="sm">
              練習模式
            </Button>
          </Link>
          <Link href={`/test/${test.id}?mode=read`}>
            <Button variant="ghost" size="sm">
              閱讀模式
            </Button>
          </Link>
        </div>
      );
    },
  },
];

export default function SessionTable() {
  const [searchQuery, setSearchQuery] = React.useState<string>();
  const [sorting, setSorting] = React.useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>(
    []
  );
  const [columnVisibility, setColumnVisibility] =
    React.useState<VisibilityState>({});

  const table = useReactTable({
    data,
    columns,
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    onColumnVisibilityChange: setColumnVisibility,

    state: {
      sorting,
      columnFilters,
      columnVisibility,
    },
  });

  return (
    <div className="w-full">
      <div className="flex items-center gap-2 py-4">
        <SessionTabs />

        <Input
          placeholder="搜尋測驗名稱..."
          value={(table.getColumn("name")?.getFilterValue() as string) ?? ""}
          onChange={(event) =>
            table.getColumn("name")?.setFilterValue(event.target.value)
          }
          className="max-w-sm"
        />
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" className="ml-auto">
              <Columns3 /> 欄位 <ChevronDown className="ml-3" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <div className="relative">
              <Input
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-8"
                placeholder="Search"
                onKeyDown={(e) => e.stopPropagation()}
              />
              <SearchIcon className="absolute inset-y-0 my-auto left-2 h-4 w-4" />
            </div>
            <DropdownMenuSeparator />
            {table
              .getAllColumns()
              .filter((column) => column.getCanHide())
              .map((column) => {
                if (
                  searchQuery &&
                  !column.id.toLowerCase().includes(searchQuery.toLowerCase())
                ) {
                  return null;
                }

                return (
                  <DropdownMenuCheckboxItem
                    key={column.id}
                    className="capitalize"
                    checked={column.getIsVisible()}
                    onCheckedChange={(value) =>
                      column.toggleVisibility(!!value)
                    }
                    onSelect={(e) => e.preventDefault()}
                  >
                    {column.id}
                  </DropdownMenuCheckboxItem>
                );
              })}
            <DropdownMenuSeparator />
            <DropdownMenuItem
              onClick={() => {
                table.resetColumnVisibility();
                setSearchQuery("");
              }}
            >
              <RefreshCcw /> Reset
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => {
                  return (
                    <TableHead key={header.id}>
                      {header.isPlaceholder
                        ? null
                        : flexRender(
                            header.column.columnDef.header,
                            header.getContext()
                          )}
                    </TableHead>
                  );
                })}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow
                  key={row.id}
                  data-state={row.getIsSelected() && "selected"}
                >
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id}>
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext()
                      )}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell
                  colSpan={columns.length}
                  className="h-24 text-center"
                >
                  No results.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
      <div className="flex items-center justify-end space-x-2 py-4">
        <div className="space-x-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => table.previousPage()}
            disabled={!table.getCanPreviousPage()}
          >
            Previous
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={() => table.nextPage()}
            disabled={!table.getCanNextPage()}
          >
            Next
          </Button>
        </div>
      </div>
    </div>
  );
}
