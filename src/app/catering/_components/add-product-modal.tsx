import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Modal } from "@/components/ui/modal";
import { useMenu } from "@/hooks/useMenu";
import debounce from "lodash.debounce";
import {
  KeyboardEvent,
  KeyboardEventHandler,
  useCallback,
  useState,
} from "react";
import { api } from "@/trpc/react";
import { Loader2 } from "lucide-react";
import { Product, ProductWithVariants } from "menu";

const cls =
  "fixed bottom-8 right-1/2 flex w-1/2 translate-x-1/2 justify-between bg-transparent";
export function AddProductModal({
  open,
  closeModal,
  menuSample,
}: {
  open: boolean;
  menuSample: string;
  closeModal: () => void;
}) {
  const [query, setQuery] = useState("");
  const { addProduct } = useMenu();
  const [selected, setSelected] = useState<Product[]>([]);
  const { isPending: variantsLoading, mutateAsync: getVariants } =
    api.product.getProductVariants.useMutation();
  const {
    data: prods,
    isPending: prodsLoading,
    error: prodsError,
    mutateAsync: search,
  } = api.product.search.useMutation();
  const {
    data: cats,
    isLoading: catsLoading,
    error: catsError,
  } = api.getCategories.useQuery();
  const [filter, setFilter] = useState<string | undefined>();
  const handleFilterClick = (name: string) => {
    if (filter == name) {
      setFilter(undefined);
      if (query) {
        search({ query, filter: undefined });
      }
    } else {
      setFilter(name);
      search({ query: query || undefined, filter: name });
    }
  };
  const handleSearch = (value: string) => {
    // if (value.trim() == "" || value.length < 3) return;
    search({ query: value || undefined, filter });
  };
  // const debouncedSearch = useCallback(
  //   debounce((value: string) => handleSearch(value), 500),
  //   [],
  // );
  if (catsError) throw catsError;
  if (catsLoading || !cats)
    return (
      <Modal
        isOpen={open}
        closeModal={closeModal}
        className="max-h-[70%] w-[70%] overflow-auto px-36"
      >
        <div className="flex min-h-screen w-full items-center justify-center bg-background">
          <Loader2 size={50} color={"black"} />
        </div>
      </Modal>
    );
  const handleProductClick = (product: ProductWithVariants) => {
    if (selected.find((item) => item.id == product.id)) {
      setSelected((prev) => prev.filter((item) => item.id != product.id));
      return;
    }
    setSelected((prev) => [...prev, product]);
  };
  const handleSave = async () => {
    if (!prods || selected.length == 0) return;
    const prodsWithVariants = await getVariants({ products: selected });
    addProduct(menuSample, prodsWithVariants);
    closeModal();
    setSelected([]);
  };
  const handleCancel = () => {
    setSelected([]);
  };
  return (
    <Modal
      isOpen={open}
      closeModal={closeModal}
      className="h-[80vh] w-[70%] max-sm:w-[95%]"
    >
      <div className="relative overflow-y-auto">
        {selected.length > 0 ? (
          <div
            className="*:spacing fixed bottom-5 right-1/2 flex w-[50vh] 
            translate-x-1/2 justify-between *:font-bold *:tracking-wider"
          >
            {/* <div className="fixed bottom-8 right-2/3 translate-x-1/2"> */}
            <Button
              variant={"accent"}
              disabled={variantsLoading}
              isLoading={variantsLoading}
              onClick={handleSave}
              className="w-40 text-base max-xl:w-32 
          max-lg:text-sm max-md:py-0 max-xs:w-32 max-xs:text-xs"
            >
              Save
              <p
                className="absolute -right-2 -top-2 rounded-full border-4 border-white
                  bg-accent p-2 py-0 text-white"
              >
                {selected.length}
              </p>
            </Button>
            {/* </div>
            <div className="fixed bottom-8 right-1/3 translate-x-1/2 "> */}
            <Button
              variant={"outline-accent"}
              disabled={variantsLoading}
              onClick={handleCancel}
              className="w-40 max-xl:w-32 max-xl:text-base 
          max-lg:text-sm max-md:py-0 max-xs:w-32 max-xs:text-xs"
            >
              Cancel
            </Button>
            {/* </div> */}
          </div>
        ) : null}
        <div className="mt-5 flex w-full flex-col items-center px-4">
          <Input
            value={query}
            autoFocus
            min={3}
            onKeyDown={(e) => {
              if (e.key == "Enter") {
                handleSearch(e.currentTarget.value);
              }
            }}
            onChange={(e) => {
              setQuery(e.target.value);
              // debouncedSearch(e.target.value);
            }}
            placeholder="Search Products..."
            className="w-full rounded-[5px] border-black/20 py-3 text-xl max-xl:text-base"
          />
          <div className="mt-4 flex max-w-[92%] justify-around gap-x-2 overflow-x-auto">
            {cats.map((category) => (
              <Button
                variant="outline"
                key={category.id}
                onClick={(e) => {
                  handleFilterClick(category.name);
                }}
                className={`
                ${
                  category.name == filter
                    ? "!border-accent-foreground bg-accent/20 hover:!bg-accent/30"
                    : "border-black/20 bg-accent/0"
                } 
              h-8 rounded-xl px-3 hover:bg-accent/10 max-xl:text-sm`}
              >
                {category.name}
              </Button>
            ))}
          </div>
        </div>
        <div className="mt-6 flex flex-col items-center overflow-y-auto">
          {prodsLoading ? (
            <div className="flex h-[400px] items-center justify-center">
              <Loader2 size={30} />
            </div>
          ) : (
            prods?.map((product, idx) => (
              <button
                key={product.id}
                className={`flex w-[90%] justify-between border border-t-transparent px-5 py-3 
            text-lg font-semibold duration-150 first:border-t-border hover:border-t 
            hover:!border-accent/50 hover:bg-accent/15 max-xl:text-base
            ${selected.find((item) => item.id == product.id) ? "border-accent !border-t-accent bg-accent/25" : ""}`}
                onClick={() => handleProductClick(product)}
              >
                <h3>{product.name}</h3>
                <h3>₾{product.price}</h3>
              </button>
            )) ?? null
          )}
        </div>
      </div>
    </Modal>
  );
}
