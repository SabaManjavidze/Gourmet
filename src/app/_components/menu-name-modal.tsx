import { Button } from "@/components/ui/button";
import { Modal } from "@/components/ui/modal";
import { Input } from "@/components/ui/input";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { api } from "@/trpc/react";

const nameNphoneSchema = z.object({
  menuName: z.string().min(3),
  phone: z
    .string()
    .min(9)
    .max(15)
    .transform((val) => parseInt(val))
    .pipe(z.number())
    .transform((val) => val.toString())
    .optional(),
});
export type MenuNameFormType = z.infer<typeof nameNphoneSchema>;

export function MenuNameModal({
  open,
  closeModal,
  onSubmit,
}: {
  open: boolean;
  closeModal: () => void;
  onSubmit: (data: MenuNameFormType) => void;
}) {
  const { data, isLoading } = api.getUserPhone.useQuery();
  const form = useForm<MenuNameFormType>({
    resolver: zodResolver(nameNphoneSchema),
    defaultValues: {
      menuName: "",
    },
  });
  return (
    <Modal
      isOpen={open}
      closeModal={closeModal}
      title="აირჩიეთ მენიუს სათაური"
      className="h-[350px] w-[700px]"
    >
      <div
        className="relative flex h-full 
        w-full flex-col items-center justify-start"
      >
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit, (err) => {
              console.log(err);
            })}
            className="relative flex flex-col items-center justify-center gap-y-5 px-14 
          py-4 max-sm:px-0"
          >
            <FormField
              control={form.control}
              name={"menuName"}
              render={({ field }) => (
                <FormItem className="w-full">
                  <div className="flex items-center justify-between">
                    <FormLabel>მენიუს სახელი</FormLabel>
                    <FormMessage />
                  </div>
                  <FormControl>
                    <Input
                      {...field}
                      className="text-md w-full rounded-sm py-2"
                      placeholder={"ჩემი მენიუ..."}
                      type={"text"}
                    />
                  </FormControl>
                </FormItem>
              )}
            />
            {!isLoading ? (
              <FormField
                control={form.control}
                name={"phone"}
                render={({ field }) => (
                  <FormItem className="w-full">
                    <div className="flex items-center justify-between">
                      <FormLabel>ტელეფონის ნომერი (სურვილისამებრ)</FormLabel>
                      <FormMessage />
                    </div>
                    <FormControl>
                      <Input
                        {...field}
                        className="text-md w-full rounded-sm py-2"
                        placeholder={data ?? "+995-"}
                        type={"text"}
                      />
                    </FormControl>
                  </FormItem>
                )}
              />
            ) : null}
            <Button type="submit" variant={"accent"}>
              დადასტურება
            </Button>
          </form>
        </Form>
      </div>
    </Modal>
  );
}
