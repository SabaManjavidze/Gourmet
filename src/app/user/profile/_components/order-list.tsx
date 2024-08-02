"use client";
import { api, RouterOutputs } from "@/trpc/react";
import { InfiniteData } from "@tanstack/react-query";
import { MenuCard } from "./menu-card";
import { useAutoAnimate } from "@formkit/auto-animate/react";
import { useSearchParams } from "next/navigation";
import { Loader2 } from "lucide-react";
import { CustomPagination } from "@/components/custom-pagination";

const checkStatus = (status: string) => {
  if (status === "draft") return "draft";
  if (status === "submitted") return "submitted";
  if (status === "completed") return "completed";
  return "draft";
};
export function OrderList({ setOpen }: { setOpen: (id: string) => void }) {
  const searchParams = useSearchParams();
  const [listRef] = useAutoAnimate();
  const page = Number(searchParams.get("page") ?? 1);
  const status = searchParams.get("status") ?? "draft";
  const { data, isLoading, error } = api.order.getUserOrders.useQuery({
    status: checkStatus(status),
    page,
    limit: 6,
  });

  if (error ?? isLoading ?? !data)
    return (
      <div className="flex min-h-[50vh] w-full items-center justify-center bg-background">
        <Loader2 size={50} color={"black"} />
      </div>
    );
  return (
    (
      <div>
        <ul
          ref={listRef}
          className="relative grid w-full grid-cols-3 gap-6 bg-white max-xl:grid-cols-3 max-lg:grid-cols-2 max-md:px-8 max-sm:grid-cols-1"
        >
          {data.orders.length > 0 ? (
            data.orders.map(
              ({ name, id, products, totalPrice, created_at }) => (
                <MenuCard
                  key={id}
                  id={id}
                  title={name}
                  totalPrice={totalPrice}
                  created_at={created_at}
                  onClick={() => setOpen(id)}
                  products={products}
                />
              ),
            )
          ) : (
            <div>
              <h2 className="ml-4 text-muted-foreground">0 Results Found</h2>
            </div>
          )}
        </ul>
        <div>
          {data.totalPages > 1 ? (
            <CustomPagination
              totalPages={data.totalPages}
              page={page}
              status={status}
            />
          ) : null}
        </div>
      </div>
    ) || (
      <div className="flex h-screen items-center justify-center bg-background">
        <h2 className="text-3xl">0 Results Found</h2>
      </div>
    )
  );
}
