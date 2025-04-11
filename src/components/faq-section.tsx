"use client";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { useTranslations } from "next-intl";

const faq = [
  {
    question: "რა არის მინიმალური შეკვეთა?",

    answer: "შეკვეთისას, რაოდენობას არ აქვს მნიშვნელობა.",
  },

  {
    question: "რამდენი ხნით ადრე უნდა განვათავსო შეკვეთა?",

    answer: "სასურველია, შეკვეთა განთავსდეს ღონისძიებამდე მინიმუმ 2 დღით ადრე",
  },

  {
    question: "როგორია გადახდის პროცედურა?",

    answer:
      "თანხის გადახდა შეგიძლიათ ვებ-გვერდიდან. ასევე, შესაძლებელია, გამოითხოვოთ ინვოისი.",
  },

  {
    question: "მოქმედებს თუ არა მიტანის სერვისი რეგიონებში?",

    answer: "დიახ, მოქმედებს.",
  },

  {
    question: "რა არის მიტანის სერვისის ღირებულება?",

    answer:
      "მიტანის სერვისი თბილისის მასშტაბით უფასოა, რეგიონებში კი განისაზღვრება მანძილის მიხედვით.",
  },

  {
    question: "შესაძლებელია მომსახურე პერსონალის დაქირავება?",

    answer:
      "დიახ, მომსახურე პერსონალის დაქირავება დამატებითი სერვისის სახით არის შესაძლებელი.",
  },

  {
    question: "შესაძლებელია თუ არა საჭირო ინვენტარის ქირაობა?",

    answer: "დიახ, საჭირო ინვენტარის ქირაობა შესაძლებელია.",
  },
];

export function FAQSection() {
  const t = useTranslations("FAQ");
  return (
    <div className="flex w-full justify-center">
      <div className="grid w-4/5 grid-cols-2 gap-3">
        {faq.map((item, idx) => (
          <Accordion type="single" collapsible key={idx}>
            <AccordionItem
              value="item-1"
              className="w-full border-b-0 bg-accent-light px-5 text-base"
            >
              <AccordionTrigger>{t("q" + (idx + 1))}</AccordionTrigger>
              <AccordionContent className="text-base">
                {t("ans" + (idx + 1))}
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        ))}
      </div>
    </div>
  );
}
