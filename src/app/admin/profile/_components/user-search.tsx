import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import debounce from "lodash.debounce";
import { limitTxt } from "@/lib/utils";
import {
  useCallback,
  useEffect,
  useState,
} from "react";
import { api } from "@/trpc/react";
import { Loader2, Mail } from "lucide-react";
import Image from "next/image";
import { User } from "next-auth";
import { useAdmin } from "@/hooks/useAdmin";

export function UserSearch() {
  const { selected,
    setSelected,
    users,
    usersLoading,
    search,
    query,
    setQuery
  } = useAdmin()
  const handleSearch = (value: string) => {
    if (value.trim() == "" || value.length < 3) return;
    search({ query: value });
  };
  const debouncedSearch = useCallback(
    debounce((value: string) => handleSearch(value), 500),
    [],
  );
  if (users?.length == 0 && usersLoading)
    return (
      <div className="flex min-h-[400px] w-full items-center justify-center bg-background">
        <Loader2 size={50} color={"black"} />
      </div>
    );
  const handleUserClick = (user: User) => {
    if (selected?.id !== user.id) {
      setSelected(user);
    }
  };
  return (
    <div className="overflow-y-auto">
      <div className="flex w-full flex-col items-center px-12">
        <Input
          value={query}
          autoFocus
          onChange={(e) => {
            setQuery(e.target.value);
            debouncedSearch(e.target.value);
          }}
          placeholder="Search Users..."
          className="w-full border-black/20 py-6 text-lg focus-within:!border-t-accent"
        />
      </div>
      <div className="mt-16 flex flex-col items-center overflow-y-auto">
        {users?.map((user, idx) => (
          <button
            key={user.id}
            className={`flex w-[90%] items-center justify-between border border-t-transparent 
            px-8 py-5 text-lg font-semibold duration-150 first:border-t-border 
            hover:border-t hover:!border-accent/50 hover:bg-accent/15
            ${selected?.id === user.id ? "border-accent !border-t-accent bg-accent/25" : ""}`}
            onClick={() => handleUserClick(user)}
          >
            <div className="flex items-center gap-x-4">
              <Image
                src={user.image}
                width={60}
                height={60}
                className={`rounded-full border-2 object-cover p-0`}
                alt="user profile image"
              />
              <h3>{limitTxt(user.name, 16)}</h3>
            </div>
            <h3 className="flex items-center gap-x-2">
              <Mail />
              {user.email}
            </h3>
            <div className="flex items-center gap-x-4 text-base">
              <div className="flex items-center gap-x-2">
                <h3 className="w-6 rounded-full bg-accent text-primary-foreground">
                  {user.orderCount}
                </h3>
                <h3>Drafts</h3>
              </div>
              {/* <div className="h-4 w-[1px] bg-muted-foreground"></div> */}
              {/* <div className="flex items-center gap-x-2"> */}
              {/*   <h3 className="w-6 rounded-full bg-accent text-primary-foreground"> */}
              {/*     4 */}
              {/*   </h3> */}
              {/*   <h3>Orders</h3> */}
              {/* </div> */}
            </div>
          </button>
        )) ?? null}
      </div>

    </div>
  );
}
