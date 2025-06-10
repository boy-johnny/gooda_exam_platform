import {
  ArrowLongLeftIcon,
  ArrowLongRightIcon,
} from "@heroicons/react/20/solid";
import Link from "next/link";

interface ProgressBarProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
  showEllipsis?: boolean;
}

/**
 * ProgressBar component for pagination navigation
 * @param currentPage - Current active page number
 * @param totalPages - Total number of pages
 * @param onPageChange - Callback function when page changes
 * @param showEllipsis - Whether to show ellipsis for long page lists
 */
export function ProgressBar({
  currentPage,
  totalPages,
  onPageChange,
  showEllipsis = true,
}: ProgressBarProps) {
  const renderPageNumbers = () => {
    const pages: React.ReactNode[] = [];
    const maxVisiblePages = 5;

    if (totalPages <= maxVisiblePages) {
      for (let i = 1; i <= totalPages; i++) {
        pages.push(
          <Link
            key={i}
            href="#"
            onClick={(e) => {
              e.preventDefault();
              onPageChange(i);
            }}
            aria-current={currentPage === i ? "page" : undefined}
            className={`inline-flex items-center border-t-2 px-4 pt-4 text-sm font-medium ${
              currentPage === i
                ? "border-indigo-500 text-indigo-600"
                : "border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700"
            }`}
          >
            {i}
          </Link>
        );
      }
    } else {
      // Always show first page
      pages.push(
        <Link
          key={1}
          href="#"
          onClick={(e) => {
            e.preventDefault();
            onPageChange(1);
          }}
          className="inline-flex items-center border-t-2 border-transparent px-4 pt-4 text-sm font-medium text-gray-500 hover:border-gray-300 hover:text-gray-700"
        >
          1
        </Link>
      );

      if (showEllipsis && currentPage > 3) {
        pages.push(
          <span
            key="ellipsis-start"
            className="inline-flex items-center border-t-2 border-transparent px-4 pt-4 text-sm font-medium text-gray-500"
          >
            ...
          </span>
        );
      }

      // Show pages around current page
      for (
        let i = Math.max(2, currentPage - 1);
        i <= Math.min(totalPages - 1, currentPage + 1);
        i++
      ) {
        pages.push(
          <Link
            key={i}
            href="#"
            onClick={(e) => {
              e.preventDefault();
              onPageChange(i);
            }}
            aria-current={currentPage === i ? "page" : undefined}
            className={`inline-flex items-center border-t-2 px-4 pt-4 text-sm font-medium ${
              currentPage === i
                ? "border-indigo-500 text-indigo-600"
                : "border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700"
            }`}
          >
            {i}
          </Link>
        );
      }

      if (showEllipsis && currentPage < totalPages - 2) {
        pages.push(
          <span
            key="ellipsis-end"
            className="inline-flex items-center border-t-2 border-transparent px-4 pt-4 text-sm font-medium text-gray-500"
          >
            ...
          </span>
        );
      }

      // Always show last page
      pages.push(
        <Link
          key={totalPages}
          href="#"
          onClick={(e) => {
            e.preventDefault();
            onPageChange(totalPages);
          }}
          className="inline-flex items-center border-t-2 border-transparent px-4 pt-4 text-sm font-medium text-gray-500 hover:border-gray-300 hover:text-gray-700"
        >
          {totalPages}
        </Link>
      );
    }

    return pages;
  };

  return (
    <nav className="flex items-center justify-between border-t border-gray-200 px-4 sm:px-0">
      <div className="-mt-px flex w-0 flex-1">
        <Link
          href="#"
          onClick={(e) => {
            e.preventDefault();
            if (currentPage > 1) onPageChange(currentPage - 1);
          }}
          className={`inline-flex items-center border-t-2 border-transparent pt-4 pr-1 text-sm font-medium ${
            currentPage === 1
              ? "text-gray-400 cursor-not-allowed"
              : "text-gray-500 hover:border-gray-300 hover:text-gray-700"
          }`}
        >
          <ArrowLongLeftIcon
            aria-hidden="true"
            className="mr-3 size-5 text-gray-400"
          />
          Previous
        </Link>
      </div>
      <div className="hidden md:-mt-px md:flex">{renderPageNumbers()}</div>
      <div className="-mt-px flex w-0 flex-1 justify-end">
        <Link
          href="#"
          onClick={(e) => {
            e.preventDefault();
            if (currentPage < totalPages) onPageChange(currentPage + 1);
          }}
          className={`inline-flex items-center border-t-2 border-transparent pt-4 pl-1 text-sm font-medium ${
            currentPage === totalPages
              ? "text-gray-400 cursor-not-allowed"
              : "text-gray-500 hover:border-gray-300 hover:text-gray-700"
          }`}
        >
          Next
          <ArrowLongRightIcon
            aria-hidden="true"
            className="ml-3 size-5 text-gray-400"
          />
        </Link>
      </div>
    </nav>
  );
}
