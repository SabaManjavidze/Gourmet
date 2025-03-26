import Script from "next/script";
import { Modal } from "../ui/modal";
import { SumSection } from "@/app/menu/_components/sum-section";
import { Button } from "../ui/button";
import { api } from "@/trpc/react";
import { useMenu } from "@/hooks/useMenu";
import { PaymentCurrency } from "@/lib/tbcTypes";
import { useRouter } from "next/navigation";
import { TBC_RETURN_URL } from "@/lib/constants";
import Image from "next/image";
import { useState } from "react";
const loading = false;
export function PaymentModal({
  open,
  closeModal,
  saveToDB,
}: {
  open: boolean;
  closeModal: () => void;
  saveToDB: (payId: string) => Promise<void>;
}) {
  const { mutateAsync: createPayment, isPending } =
    api.tbc.createPayment.useMutation();
  const { totalSum, menu } = useMenu();
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const handleTBCClick = async () => {
    setLoading(true);
    const res = await createPayment({
      amount: {
        // total: 0.01,
        total: totalSum,
        currency: PaymentCurrency.GEL,
        shipping: 0,
        subtotal: 0,
        tax: 0,
      },
      returnurl: TBC_RETURN_URL,
      installmentProducts: menu[Object.keys(menu).slice(-1)[0] as string]?.map(
        (prod) => {
          return {
            Price: prod.price,
            Quantity: prod.quantity,
            Name: prod.name,
          };
        },
      ),
    });
    localStorage.setItem("payId", res.payId);
    await saveToDB(res.payId);
    const link = res.links.find((item) => item.method == "REDIRECT")?.uri;
    if (!link) throw new Error("invalid response");
    setLoading(false);
    router.push(link);
  };
  return (
    <Modal
      isOpen={open}
      closeModal={closeModal}
      className={`h-[55vh] w-[40%] ${loading ? "overflow-hidden" : "overflow-y-auto"}
         max-sm:w-[95%]`}
    >
      <div
        className={`absolute inset-0 z-10 items-center justify-center bg-gray-300/50`}
      >
        <div className="flex h-4/5 w-full items-center justify-center">
          <Button
            onClick={() => handleTBCClick()}
            isLoading={loading}
            disabled={loading}
            className="flex h-12 w-72 items-center justify-between rounded-[5px] bg-[#01adf0]
            text-primary-foreground duration-150 hover:bg-[#0086b7]"
          >
            <div className="flex w-full items-center gap-x-3">
              <Image
                src="https://ecom.tbcpayments.ge/tbccheckoutbutton/tbc-logo-white.svg"
                alt="tbc logo"
                width={30}
                height={30}
              />
              <h3 className="font-bold">გადახდა</h3>
            </div>
            <div className="flex items-center gap-x-2">
              <Image
                src="/logos/visa.png"
                alt="tbc logo"
                width={40}
                height={40}
              />
              <Image
                src="/logos/mastercard.png"
                alt="tbc logo"
                width={25}
                height={25}
              />
              <Image
                src="/logos/qr.png"
                alt="tbc logo"
                width={25}
                height={25}
              />
            </div>
          </Button>
        </div>
        <SumSection />
      </div>
    </Modal>
  );
}
