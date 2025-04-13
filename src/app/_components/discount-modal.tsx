"use client";
import React, {
  Dispatch,
  SetStateAction,
  useEffect,
  useMemo,
  useState,
} from "react";
import { Modal } from "@/components/ui/modal";
import { Button } from "@/components/ui/button";
// import type { AuthProviders } from "@/utils/types/types";
import { signIn } from "next-auth/react";
import { env } from "@/env";
import { linkedInTrack } from "nextjs-linkedin-insight-tag";
import { sendGTMEvent } from "@next/third-parties/google";
import { useTranslations } from "next-intl";
type AuthProviders = "google" | "facebook";
export default function DiscountModal({
  modalOpen,
  closeModal,
}: //   setShowModal,
{
  modalOpen: boolean;
  //   setShowModal: Dispatch<SetStateAction<boolean>>;
  closeModal: () => void;
}) {
  const [loading, setLoading] = useState<AuthProviders | "none">("none");
  const logIn = async (provider: AuthProviders) => {
    setLoading(provider);
    await signIn(provider);
    setLoading("none");
  };

  const currStatus = useMemo(() => {
    const t = localStorage.getItem("discount");
    if (t) {
      return t == "true";
    }
    return false;
  }, [modalOpen]);
  const markAsSeen = () => {
    if (currStatus) return;
    localStorage.setItem("discount", "true");
    closeModal();
  };
  const t = useTranslations("DiscountModal");
  return (
    <Modal
      isOpen={modalOpen}
      title={t.rich("title")}
      closeModal={() => {
        closeModal();
        markAsSeen();
      }}
    >
      <div className="flex justify-center gap-x-2 text-center text-xl font-semibold">
        {t.rich("discount txt", {
          important: (val) => <h2 className="font-bold text-accent">{val}</h2>,
        })}
      </div>
      <div className="flex flex-col items-center justify-center">
        <Button
          onClick={() => {
            logIn("google");
            linkedInTrack(env.LINKEDIN_EVENT_ID);
            sendGTMEvent({
              event: "buttonClicked",
              value: "login button clicked",
            });
          }}
          isLoading={loading == "google"}
          className="flex h-16 w-72 cursor-pointer items-center justify-center rounded bg-blue-500 px-4 py-3 text-sm font-bold text-gray-100 shadow hover:bg-blue-600 hover:text-white"
        >
          <svg
            viewBox="0 0 24 24"
            className="mr-3 h-6 w-[10%] fill-current"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path d="M12.24 10.285V14.4h6.806c-.275 1.765-2.056 5.174-6.806 5.174-4.095 0-7.439-3.389-7.439-7.574s3.345-7.574 7.439-7.574c2.33 0 3.891.989 4.785 1.849l3.254-3.138C18.189 1.186 15.479 0 12.24 0c-6.635 0-12 5.365-12 12s5.365 12 12 12c6.926 0 11.52-4.869 11.52-11.726 0-.788-.085-1.39-.189-1.989H12.24z" />
          </svg>
          <span className="mr-1 block h-6 w-1 border-l border-white"></span>
          <span className="w-[90%] pl-3 font-sans text-lg">{t("auth")}</span>
        </Button>
      </div>
    </Modal>
  );
}
