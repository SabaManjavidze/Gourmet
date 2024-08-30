import { cn } from "@/lib/utils";
import { v4 as uuid } from "uuid";
import { useEffect, useState } from "react";
import { MenuCardModal } from "./menu-card-modal";
import { ProductWithVariants } from "menu";
import { GrabIcon, Trash, XCircleIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { api } from "@/trpc/react";
import NumberTicker from "@/components/magicui/number-ticker";
import TypingAnimation from "@/components/magicui/typing-animation";
import { AnimatedList } from "@/components/magicui/animated-list";
import { useSession } from "next-auth/react";

export function MenuCard({
  id,
  userId,
  title,
  totalPrice,
  created_at,
  products,
  onClick,
}: {
  id: string;
  userId?: string;
  title: string;
  created_at: string;
  totalPrice: string;
  onClick: () => void;
  products: (ProductWithVariants & { quantity: number })[];
}) {
  const { data: session } = useSession();
  const utils = api.useUtils();
  const [adminLoading, setAdminLoading] = useState(false);
  const { mutateAsync: deleteOrder, isPending } =
    api.order.deleteUserOrder.useMutation({
      onSuccess() {
        utils.order.getUserOrders.invalidate();
      },
    });

  const handleDeleteClick = async () => {
    if (session?.user.role == "user") {
      await deleteOrder({ orderId: id });
    } else if (session?.user.role == "admin" && userId) {
      setAdminLoading(true);
      await utils.client.admin.deleteUserOrder.mutate({
        orderId: id,
        userId,
      });
      await utils.admin.getUserOrders.invalidate();
      setAdminLoading(false);
    }
  };
  return (
    <div className="relative rounded-lg bg-white">
      <Button
        isLoading={isPending || adminLoading}
        onClick={handleDeleteClick}
        className="absolute right-0 top-4 z-20 mt-1 flex 
      -translate-y-full translate-x-1/2 items-end bg-transparent text-xs
      font-semibold text-muted-foreground hover:bg-transparent"
      >
        <XCircleIcon className="z-20 ml-1" />
      </Button>
      <button
        onClick={onClick}
        className="flex w-full flex-col justify-center
        border border-accent text-start duration-150 hover:shadow-lg hover:shadow-black/15"
      >
        <AnimatedList
          delay={150}
          className="group h-60 w-full overflow-hidden px-4 py-2 pr-[21px] hover:overflow-auto
          "
        >
          {products.map(({ price, name, id, quantity }) => (
            <li
              key={id}
              className="mt-2 flex w-full flex-col 
              items-center text-muted-foreground first-of-type:mt-0"
            >
              <div className="flex w-full justify-center">
                <p className="max-h-6 w-[55%] overflow-hidden text-ellipsis">
                  {name}
                </p>
                <div className="flex w-[45%] items-center justify-between *:w-1/3 *:text-start">
                  <p>₾{price}</p>
                  <div
                    className="flex items-start justify-start
                  text-primary-foreground"
                  >
                    <p
                      className="h-5 w-4/5 rounded-full
                  bg-muted-foreground/55 text-center leading-[20px]"
                    >
                      {quantity}
                    </p>
                  </div>
                  <p className="text-center">${quantity * price}</p>
                </div>
              </div>
              <div className="mt-1 h-[1px] w-4/5 bg-border" />
            </li>
          ))}
        </AnimatedList>
        <div className="flex w-full flex-col justify-between border-t border-accent p-2 px-4">
          <div className="flex justify-between">
            <TypingAnimation
              text={title}
              duration={70}
              className="overflow-hidden text-ellipsis whitespace-nowrap text-lg font-semibold"
            />
            <h4 className="text-lg font-semibold">
              $
              {Number(totalPrice) < 2 ? (
                totalPrice
              ) : (
                <NumberTicker value={Number(totalPrice)} />
              )}
            </h4>
          </div>
          <h4 className="mt-1 text-xs font-semibold text-muted-foreground">
            {created_at}
          </h4>
        </div>
      </button>
    </div>
  );
}
