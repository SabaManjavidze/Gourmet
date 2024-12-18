import { z } from "zod";

export const eventTypes = [
  "კორპორაციული ღონისძიება",
  "ქორწილი",
  "კერძო წვეულება",
  "ფესტივალი",
  "სხვა",
] as const;
export const priceObj = {
  cheap: {
    title: "ეკონომიური",
    desc: "ეკონომიური მენიუ გათვლილია მცირე ბიუჯეტზე და მოიცავს მსუბუქ წასახემსებელს.",
  },
  standard: {
    title: "სტანდარტული",
    desc: "“გურმეს” სტანდარტული მენიუ იდეალურია ყველანაირი ღონისძიებისთვის, მათ შორის, კორპორაციული წვეულებებისთვის, ოჯახური დღესასწაულების ან ვორქშოფებისთვის.",
  },
  expensive: {
    title: "გასტრონომიური შედევრი",
    desc: "გამორჩეული მენიუ მოიცავს კერძებისა და სასმელების ფართო ასორტიმენტს, თქენს კომფორტზე კი გურმეს პროფესიონალური მომსახურე პერსონალი იზრუნებს. აჩუქეთ თქვენს სტუმრებს უნიკალური გასტრონომიული გამოცდილება.",
  },
};
export const priceTypes = ["cheap", "standard", "expensive"] as const;
export const customCateringSchema = z.object({
  type: z.enum(eventTypes),
  eventDetails: z.string(),
  userEmail: z.string().email().optional(),
  numberOfGuests: z.string(),
  dateOfEvent: z.date(),
  priceRange: z.enum(priceTypes),
});
export type customCateringFormType = z.infer<typeof customCateringSchema>;
