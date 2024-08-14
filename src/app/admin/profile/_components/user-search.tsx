import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import debounce from "lodash.debounce";
import { limitTxt } from "@/lib/utils";
import { useTabs } from "@/components/ui/tabs";
import {
  Dispatch,
  SetStateAction,
  useCallback,
  useEffect,
  useState,
} from "react";
import { Loader2, Mail } from "lucide-react";
import Image from "next/image";
import { User } from "next-auth";
import { useAdmin } from "@/hooks/useAdmin";
import { RouterOutputs } from "@/trpc/react";

export function UserSearch(
  {
    selected,
    controlQuery,
    users,
    usersLoading,
    handleUserClick,
    handleSearch
  }: {
    users?: RouterOutputs["admin"]["searchUsers"];
    usersLoading: boolean;
    selected?: User;
    controlQuery?: {
      query: string;
      setQuery: Dispatch<SetStateAction<string>>;
    };
    handleUserClick: (user: User) => void;
    handleSearch: (value: string) => void;
  }) {
  const [defQuery, setDefQuery] = useState("")
  const debouncedSearch = useCallback(
    debounce((value: string) => handleSearch(value), 500),
    [],
  );
  if (users?.length == 0 && usersLoading)
    return (
      <div className="flex min-h-[200px] w-full items-center justify-center bg-background">
        <Loader2 size={50} color={"black"} />
      </div>
    );
  return (
    <div className="overflow-y-auto w-full">
      <div className="flex w-full flex-col items-center px-12">
        <Input
          value={!controlQuery ? defQuery : controlQuery.query}
          autoFocus
          onChange={(e) => {
            if (controlQuery) {
              controlQuery.setQuery(e.target.value)
            } else {
              setDefQuery?.(e.target.value);;
            }
            debouncedSearch(e.target.value);
          }}
          placeholder="Search Users..."
          className="w-full border-black/20 py-6 text-lg 
        focus-within:!border-t-accent"
        />
      </div>
      <div className="mt-8 flex flex-col items-center overflow-y-auto">
        {users?.map((user, idx) => (
          <button
            key={user.id}
            className={`flex w-[90%] items-center justify-between border border-t-transparent 
            px-8 py-2 font-semibold duration-150 first:border-t-border 
            hover:border-t hover:!border-accent/50 hover:bg-accent/15
            ${selected?.id === user.id ? "border-accent !border-t-accent bg-accent/25" : ""}`}
            onClick={() => handleUserClick(user)}
          >
            <div className="flex items-center gap-x-4">
              <Image
                src={user.image}
                width={40}
                height={40}
                className={`rounded-full border-2 object-cover p-0`}
                alt="user profile image"
              />
              <h3 className="text-base">{limitTxt(user.name, 16)}</h3>
            </div>
            <h3 className="flex items-center gap-x-2">
              <Mail />
              {user.email}
            </h3>
            <div className="flex items-center gap-x-4">
              <div className="flex items-center gap-x-2">
                <h3 className="flex items-center justify-center
                    w-4 text-sm rounded-full bg-accent text-primary-foreground">
                  {user.orderCount}
                </h3>
                <h3>Drafts</h3>
              </div>
            </div>
          </button>
        )) ?? null}
      </div>

    </div>
  );
}
