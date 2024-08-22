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
import { useSession } from "next-auth/react";

export function CustomPagination({
  page,
  args = "",
  previousHref,
  nextHref,
  totalPages,
}: {
  page: number;
  args?: string;
  previousHref?: string;
  nextHref?: string;
  totalPages: number;
}) {
  const { data: session } = useSession();
  return (
    <Pagination className="mt-12">
      <PaginationContent>
        {page != 1 ? (
          <PaginationItem>
            <PaginationPrevious
              href={
                previousHref ??
                `/${session?.user?.role ?? "user"}/profile?page=${page - 1}&${args}`
              }
            />
          </PaginationItem>
        ) : null}
        {Array.from({ length: totalPages ?? 1 }).map((_, idx) => (
          <PaginationItem
            key={uuid()}
            className={`border-2 ${page == idx + 1 ? "border-accent" : "border-transparent"}`}
          >
            <PaginationLink
              href={`/${session?.user?.role ?? "user"}/profile?page=${idx + 1}&${args}`}
            >
              {idx + 1}
            </PaginationLink>
          </PaginationItem>
        ))}
        {page != totalPages ? (
          <PaginationItem>
            <PaginationNext
              href={
                nextHref ??
                `/${session?.user?.role ?? "user"}/profile?page=${page + 1}&${args}`
              }
            />
          </PaginationItem>
        ) : null}
      </PaginationContent>
    </Pagination>
  );
}
