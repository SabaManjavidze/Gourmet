import { Mail, PhoneCall } from "lucide-react";
import { useTranslations } from "next-intl";
import Link from "next/link";

export function Footer() {
  const routes = [
    {
      title: "მთავარი",
      route: "/",
    },

    {
      title: "ფურშეტი",
      route: "/catering",
    },
    {
      title: "მენიუ",
      route: "/menu",
    },
    {
      title: "ჩვენს შესახებ",
      route: "/about-us",
    },
    {
      title: "კონტაქტი",
      route: "",
    },
  ];
  const t = useTranslations("Footer");
  const n = useTranslations("Nav");
  const g = useTranslations("General");
  return (
    <footer
      id="footer"
      className="relative mt-56 flex flex-col items-center bg-footer-banner bg-cover bg-center py-52"
    >
      <div className="absolute right-1/2 top-0 h-[130px] w-[145px] -translate-y-1/2 translate-x-1/2 border-[3px] border-white bg-nav-logo bg-cover bg-center bg-no-repeat">
        {/* <h3 className="absolute bottom-0 right-1/2 translate-x-1/2 translate-y-[130%] font-georgia text-5xl italic text-white">
          Gourmet
        </h3> */}
      </div>

      <div className="flex min-h-64 w-3/5 justify-between bg-black/25 p-8 text-white max-xl:w-3/4 max-lg:items-center max-lg:text-sm max-md:flex-col">
        <div className="flex flex-col items-start justify-between max-lg:w-full max-lg:items-center">
          <h4 className="text-xl font-semibold">{g("contact us")}</h4>
          {/* <span className="flex">
            <PhoneCall className="mr-2" />
            <p>032 2 22 32 38</p>
          </span> */}
          <span className="flex">
            <PhoneCall className="mr-2" />
            <p>+995 597 555 266 </p>
          </span>
          <span className="flex">
            <Mail className="mr-2" />
            <p>r.muzashvili@gurme.ge</p>
          </span>
        </div>

        <div className="flex flex-col items-start justify-between max-lg:mt-5 max-lg:w-full max-lg:items-center max-lg:text-center">
          <h4 className="text-xl font-semibold">{g("links")}</h4>
          {routes.map(({ route }, idx) => (
            <Link key={idx} href={route}>
              {n("title" + (idx + 1))}
            </Link>
          ))}
        </div>
        <div className="flex flex-col items-start justify-between max-lg:w-full max-lg:items-center max-lg:text-center">
          <h4 className="text-xl font-semibold max-lg:mt-5 ">
            {t("address title")}
          </h4>
          <p className="max-w-40 max-lg:w-full">{t("address location")}</p>

          <div className="text-blue-gray-900 flex gap-2 sm:justify-center">
            <Link
              href="https://www.facebook.com/Gourmet.ge/"
              className="opacity-80 transition-opacity hover:opacity-100"
            >
              <svg
                className="h-8 w-8"
                fill="currentColor"
                viewBox="0 0 24 24"
                aria-hidden="true"
              >
                <path
                  fillRule="evenodd"
                  d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z"
                  clipRule="evenodd"
                />
              </svg>
            </Link>
            <Link
              href="https://www.instagram.com/gourmet_gurme/"
              className="opacity-80 transition-opacity hover:opacity-100"
            >
              <svg
                className="h-8 w-8"
                fill="currentColor"
                viewBox="0 0 24 24"
                aria-hidden="true"
              >
                <path
                  fillRule="evenodd"
                  d="M12.315 2c2.43 0 2.784.013 3.808.06 1.064.049 1.791.218 2.427.465a4.902 4.902 0 011.772 1.153 4.902 4.902 0 011.153 1.772c.247.636.416 1.363.465 2.427.048 1.067.06 1.407.06 4.123v.08c0 2.643-.012 2.987-.06 4.043-.049 1.064-.218 1.791-.465 2.427a4.902 4.902 0 01-1.153 1.772 4.902 4.902 0 01-1.772 1.153c-.636.247-1.363.416-2.427.465-1.067.048-1.407.06-4.123.06h-.08c-2.643 0-2.987-.012-4.043-.06-1.064-.049-1.791-.218-2.427-.465a4.902 4.902 0 01-1.772-1.153 4.902 4.902 0 01-1.153-1.772c-.247-.636-.416-1.363-.465-2.427-.047-1.024-.06-1.379-.06-3.808v-.63c0-2.43.013-2.784.06-3.808.049-1.064.218-1.791.465-2.427a4.902 4.902 0 011.153-1.772A4.902 4.902 0 015.45 2.525c.636-.247 1.363-.416 2.427-.465C8.901 2.013 9.256 2 11.685 2h.63zm-.081 1.802h-.468c-2.456 0-2.784.011-3.807.058-.975.045-1.504.207-1.857.344-.467.182-.8.398-1.15.748-.35.35-.566.683-.748 1.15-.137.353-.3.882-.344 1.857-.047 1.023-.058 1.351-.058 3.807v.468c0 2.456.011 2.784.058 3.807.045.975.207 1.504.344 1.857.182.466.399.8.748 1.15.35.35.683.566 1.15.748.353.137.882.3 1.857.344 1.054.048 1.37.058 4.041.058h.08c2.597 0 2.917-.01 3.96-.058.976-.045 1.505-.207 1.858-.344.466-.182.8-.398 1.15-.748.35-.35.566-.683.748-1.15.137-.353.3-.882.344-1.857.048-1.055.058-1.37.058-4.041v-.08c0-2.597-.01-2.917-.058-3.96-.045-.976-.207-1.505-.344-1.858a3.097 3.097 0 00-.748-1.15 3.098 3.098 0 00-1.15-.748c-.353-.137-.882-.3-1.857-.344-1.023-.047-1.351-.058-3.807-.058zM12 6.865a5.135 5.135 0 110 10.27 5.135 5.135 0 010-10.27zm0 1.802a3.333 3.333 0 100 6.666 3.333 3.333 0 000-6.666zm5.338-3.205a1.2 1.2 0 110 2.4 1.2 1.2 0 010-2.4z"
                  clipRule="evenodd"
                />
              </svg>
            </Link>
          </div>
        </div>
      </div>
      <div className="absolute bottom-0 left-0 right-0 flex justify-between border-t-2 border-white px-16 py-5 text-white">
        <p>copyrights@Gourmet 2024</p>
        <p>All rights reserved</p>
      </div>
    </footer>
  );
}
