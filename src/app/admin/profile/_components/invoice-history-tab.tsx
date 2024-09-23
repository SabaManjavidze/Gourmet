"use client";
import { useTabs } from "@/components/ui/tabs";
import { Loader2, Mail } from "lucide-react";
import Image from "next/image";
import { User } from "next-auth";
import { useAdmin } from "@/hooks/useAdmin";
import { UserSearch } from "./user-search";
import { api } from "@/trpc/react";
import { usePathname, useSearchParams, useRouter } from "next/navigation";
import { useEffect } from "react";
import { CustomPagination } from "@/components/custom-pagination";
import { MenuCardModal } from "./menu-card-modal";
import { limitTxt } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { InvoiceCard } from "./invoice-card";

export function InvoiceHistoryTab() {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const router = useRouter();
  const page = Number(searchParams.get("page") ?? 1);
  const { data: invoiceData, isLoading: invoicesLoading } =
    api.admin.getInvoiceHistory.useQuery({
      page,
      limit: 8,
    });
  const { open, setOpen, selected, setSelected } = useAdmin();
  const closeModal = () => {
    setOpen(null);
  };
  // const { switchTab } = useTabs();

  useEffect(() => {
    if (invoiceData && Number(invoiceData?.totalPages) + 1 < page) {
      router.replace(`${pathname}?page=${invoiceData.totalPages + 1}`);
    }
  }, [invoiceData]);
  if (invoiceData?.invoices.length == 0 && invoicesLoading)
    return (
      <div className="flex min-h-[400px] w-full items-center justify-center bg-background">
        <Loader2 size={50} color={"black"} />
      </div>
    );
  return (
    <div>
      {!!open ? (
        <MenuCardModal open={true} orderId={open} closeModal={closeModal} />
      ) : null}
      <ul className="flex flex-col gap-y-2">
        {invoiceData?.invoices.map(({ order, user }) => (
          <li key={order.id}>
            <InvoiceCard order={order} user={user} />
          </li>
        ))}
      </ul>
      <div>
        {Number(invoiceData?.totalPages) > 1 ? (
          <CustomPagination
            totalPages={invoiceData?.totalPages ?? 0}
            page={page}
            args={`status=${status}`}
          />
        ) : null}
      </div>
    </div>
  );
}
