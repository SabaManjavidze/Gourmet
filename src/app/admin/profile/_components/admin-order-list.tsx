
import { api } from "@/trpc/react";
import { MenuCardModal } from "@/app/admin/profile/_components/menu-card-modal";
import { useAutoAnimate } from "@formkit/auto-animate/react";
import { useSearchParams } from "next/navigation";
import { Loader2 } from "lucide-react";
import { CustomPagination } from "@/components/custom-pagination";
import { MenuCard } from "@/app/user/profile/_components/menu-card";
import { useAdmin } from "@/hooks/useAdmin";
import { Dispatch, SetStateAction } from "react";

const checkStatus = (status: string) => {
  if (status === "draft") return "draft";
  if (status === "submitted") return "submitted";
  if (status === "completed") return "completed";
  return "draft";
};
export function AdminOrderList() {
  const searchParams = useSearchParams();
  const [listRef] = useAutoAnimate();
  const page = Number(searchParams.get("page") ?? 1);
  const status = searchParams.get("status") ?? "draft";
  const { selected, open, setOpen } = useAdmin()
  const { data, isLoading, error } = api.admin.getUserOrders.useQuery({
    userId: selected?.id ?? "",
    page,
    limit: 6,
  }, { enabled: !!selected });

  if (error) throw error;
  if (isLoading || (!!selected && !data))
    return (
      <div className="flex min-h-[50vh] w-full items-center justify-center bg-background">
        <Loader2 size={50} color={"black"} />
      </div>
    );
  const closeModal = () => {
    setOpen(null);
  };
  return (
    (
      <div>
        {!!open ? (
          <MenuCardModal open={true} orderId={open} closeModal={closeModal} />
        ) : null}
        <ul
          ref={listRef}
          className="relative grid w-full grid-cols-3 gap-6 bg-white max-xl:grid-cols-3 max-lg:grid-cols-2 max-md:px-8 max-sm:grid-cols-1"
        >
          {Number(data?.orders?.length) > 0 ? (
            data?.orders.map(
              ({ name, id, products, totalPrice, created_at }) => (
                <MenuCard
                  key={id}
                  id={id}
                  userId={selected?.id}
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
              <h2 className="ml-4 text-muted-foreground">User is not Selected</h2>
            </div>
          )}
        </ul>
        <div>
          {data && data.totalPages > 1 ? (
            <CustomPagination
              totalPages={data.totalPages}
              page={page}
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
