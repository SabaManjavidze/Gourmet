import { Modal } from "@/components/ui/modal";
import { Button } from "../ui/button";
import { useEffect, useMemo, useState } from "react";
import { useTranslations } from "next-intl";
import { Locale } from "@/i18n/config";
import { getUserLocale } from "@/lib/locale";
import { TNCTextGeo } from "./tnc-text-ge";
import { TNCTextEn } from "./tnc-text-en";
const loading = false;
export function TermsAndConditions({
  open,
  closeModal,
}: {
  open: boolean;
  closeModal: () => void;
}) {
  const g = useTranslations("General");
  const t = useTranslations("TNC Page");
  const [lang, setLang] = useState<Locale>("ge");
  async function setlanguage() {
    const locale = await getUserLocale();
    setLang(locale);
  }
  useEffect(() => {
    setlanguage();
  }, []);
  const currStatus = useMemo(() => {
    const t = localStorage.getItem("tnc");
    if (t) {
      return t == "true";
    }
    return false;
  }, [open]);
  const handleAcceptClick = () => {
    if (currStatus) return;
    localStorage.setItem("tnc", "true");
    closeModal();
  };
  return (
    <Modal
      isOpen={open}
      closeModal={closeModal}
      className={`h-[80vh] w-[70%] ${loading ? "overflow-hidden" : "overflow-y-auto"}
         max-sm:w-[95%]`}
    >
      <h1 className="text-center text-xl font-semibold">{t("title")}</h1>
      <div className="flex h-full justify-center overflow-y-scroll">
        {lang == "ge" ? <TNCTextGeo /> : <TNCTextEn />}
      </div>
      <div className="flex justify-center">
        <Button
          disabled={!!currStatus}
          variant={"accent"}
          onClick={() => handleAcceptClick()}
          className="w-1/3"
        >
          {g("agree")}
        </Button>
      </div>
    </Modal>
  );
}
