"use client";

import Link from "next/link";
import * as React from "react";

import {
  ColumnDef,
  ColumnFiltersState,
  SortingState,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table";
import { ArrowUpDown } from "lucide-react";
import { Button } from "@/components/ui/button";
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

interface SessionTableProps {
  initialTests: Test[];
  initialChapters: Chapter[];
}

export type Test = {
  id: string;
  subject_id: string;
  name: string;
  year: number;
  period: number;
  question_count?: number;
};

// 1. 【新增】為「年度」視圖定義一個新的資料型別
export type YearlyExamGroup = {
  id: string; // 由 year 和 period 組成，例如 "112-1"
  year: number;
  period: number;
  examName: string; // 例如 "112 年度 - 第 1 期測驗"
  subjectCount: number; // 該期數包含的科目數量
  tests: Test[]; // 包含原始的 Test 物件，方便未來擴充
};

// 2. 【新增】為章節資料定義型別
export type Chapter = {
  id: string;
  subject_id: string;
  title: string;
  parent_id?: string;
};

// 科目欄位 ------------------------------------------------------------
export const subjectColumns: ColumnDef<Test>[] = [
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
    header: () => <div className="text-center">操作</div>,
    cell: ({ row }) => {
      const test = row.original;

      return (
        <div className="flex justify-center items-center gap-2">
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

// 年度欄位 ------------------------------------------------------------
export const yearColumns: ColumnDef<YearlyExamGroup>[] = [
  {
    accessorKey: "examName",
    header: "考試期數",
    cell: ({ row }) => (
      <div className="font-medium">{row.getValue("examName")}</div>
    ),
  },
  {
    accessorKey: "subjectCount",
    header: () => <div className="text-center">包含科目數</div>,
    cell: ({ row }) => (
      <div className="text-center">{row.getValue("subjectCount")}</div>
    ),
  },
  {
    id: "actions",
    header: () => <div className="text-right">操作</div>,
    cell: ({ row }) => {
      // 這裡的邏輯會和 subjectColumns 不一樣
      return (
        <div className="flex justify-end gap-2">
          <Link
            href={`/test/group?year=${row.original.year}&period=${row.original.period}`}
          >
            <Button variant="default" size="sm">
              全科模擬測驗
            </Button>
          </Link>
          {/* 我們也可以加上一個 "查看詳情" 的按鈕 */}
          <Button variant="outline" size="sm">
            查看詳情
          </Button>
        </div>
      );
    },
  },
];

// 章節欄位 ------------------------------------------------------------
export const chapterColumns: ColumnDef<Chapter>[] = [
  {
    accessorKey: "title",
    header: "章節名稱",
    cell: ({ row }) => {
      // 未來可以根據 parent_id 在這裡加上縮排，做出樹狀效果
      const hasParent = !!row.original.parent_id;
      return (
        <div className={`font-medium ${hasParent ? "pl-6" : ""}`}>
          {hasParent ? "↳ " : ""}
          {row.getValue("title")}
        </div>
      );
    },
  },
  {
    id: "actions",
    header: () => <div className="text-right">操作</div>,
    cell: ({ row }) => (
      <div className="flex justify-end">
        {/* 注意：這個按鈕的連結是準備好的，但功能取決於後端資料 */}
        <Link href={`/practice/chapter/${row.original.id}`}>
          <Button variant="ghost" size="sm">
            章節練習
          </Button>
        </Link>
      </div>
    ),
  },
];

export default function SessionTable({
  initialTests,
  initialChapters,
}: SessionTableProps) {
  const [activeTab, setActiveTab] = React.useState("subject");

  const [sorting, setSorting] = React.useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>(
    []
  );

  // 5. 【修改】擴充 useMemo 的邏輯
  const columns = React.useMemo(() => {
    if (activeTab === "year") return yearColumns;
    if (activeTab === "chapter") return chapterColumns;
    return subjectColumns; // 預設
  }, [activeTab]);

  // 2. 建立篩選邏輯
  // 使用 useMemo 可以避免不必要的重複計算，提升效能
  const filteredData = React.useMemo(() => {
    console.log(`Tab changed to: ${activeTab}`); // 用於偵錯
    switch (activeTab) {
      case "subject":
        // 如果是「科目」，直接回傳原始資料
        return initialTests;
      case "year":
        return [];
      case "chapter":
        return initialChapters;
      default:
        return [];
    }
  }, [activeTab, initialTests, initialChapters]); // 當頁籤或原始資料改變時，才重新計算

  // 2. 【核心邏輯】使用 useMemo 來動態轉換資料
  const tableData = React.useMemo(() => {
    if (activeTab === "year") {
      // --- 開始進行「年度」資料分組 ---
      const groups: Record<string, YearlyExamGroup> = {};

      initialTests.forEach((test) => {
        const groupId = `${test.year}-${test.period}`;
        if (!groups[groupId]) {
          groups[groupId] = {
            id: groupId,
            year: test.year,
            period: test.period,
            examName: `${test.year} 年度 - 第 ${test.period} 期測驗`,
            subjectCount: 0,
            tests: [],
          };
        }
        groups[groupId].subjectCount++;
        groups[groupId].tests.push(test);
      });

      return Object.values(groups); // 回傳分組後的資料
    }
    return initialTests;
  }, [activeTab, initialTests, initialChapters]);

  const table = useReactTable({
    data: tableData as Test[],
    columns: columns as ColumnDef<Test>[],
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    state: {
      sorting,
      columnFilters,
    },
  });

  const filterColumnId =
    activeTab === "year"
      ? "examName"
      : activeTab === "chapter"
      ? "title"
      : "name";
  const filterPlaceholder =
    activeTab === "year"
      ? "搜尋考試期數..."
      : activeTab === "chapter"
      ? "搜尋章節名稱..."
      : "搜尋測驗名稱...";

  return (
    <div className="w-full">
      <div className="flex justify-between items-center gap-2 py-4">
        <SessionTabs activeTab={activeTab} onTabChange={setActiveTab} />

        <Input
          placeholder={filterPlaceholder}
          value={
            (table.getColumn(filterColumnId)?.getFilterValue() as string) ?? ""
          }
          onChange={(event) =>
            table.getColumn(filterColumnId)?.setFilterValue(event.target.value)
          }
          className="max-w-sm"
        />
      </div>
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => {
                  return (
                    <TableHead
                      key={header.id}
                      className="align-middle text-center"
                    >
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
                    <TableCell
                      key={cell.id}
                      className="align-middle text-center"
                    >
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
