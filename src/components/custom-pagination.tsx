"use client";

import { v4 as uuid } from "uuid";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationPrevious,
  PaginationLink,
  PaginationNext,
} from "./ui/pagination";

export function CustomPagination({
  page,
  status,
  totalPages,
}: {
  page: number;
  status: string;
  totalPages: number;
}) {
  return (
    <Pagination className="mt-12">
      <PaginationContent>
        {page != 1 ? (
          <PaginationItem>
            <PaginationPrevious
              href={`/user/profile?page=${page - 1}&status=${status}`}
            />
          </PaginationItem>
        ) : null}
        {Array.from({ length: totalPages ?? 1 }).map((_, idx) => (
          <PaginationItem
            key={uuid()}
            className={`border-2 ${page == idx + 1 ? "border-accent" : "border-transparent"}`}
          >
            <PaginationLink
              href={`/user/profile?page=${idx + 1}&status=${status}`}
            >
              {idx + 1}
            </PaginationLink>
          </PaginationItem>
        ))}
        {page != totalPages ? (
          <PaginationItem>
            <PaginationNext
              href={`/user/profile?page=${page + 1}&status=${status}`}
            />
          </PaginationItem>
        ) : null}
      </PaginationContent>
    </Pagination>
  );
}
