import { useTabs } from "@/components/ui/tabs";
import { Loader2, Mail } from "lucide-react";
import Image from "next/image";
import { User } from "next-auth";
import { useAdmin } from "@/hooks/useAdmin";
import { UserSearch } from "./user-search";

export function UserSearchTab() {
  const { selected,
    setSelected,
    users,
    usersLoading,
    search,
    query,
    setQuery
  } = useAdmin()
  const { switchTab } = useTabs()
  const handleSearch = (value: string) => {
    if (value.trim() == "" || value.length < 3) return;
    search({ query: value });
  };
  if (users?.length == 0 && usersLoading)
    return (
      <div className="flex min-h-[400px] w-full items-center justify-center bg-background">
        <Loader2 size={50} color={"black"} />
      </div>
    );
  const handleUserClick = (user: User) => {
    if (selected?.id !== user.id) {
      setSelected(user);
      switchTab(0)
    }
  };
  return <UserSearch
    selected={selected}
    controlQuery={{ query, setQuery }}
    users={users}
    usersLoading={usersLoading}
    handleUserClick={handleUserClick}
    handleSearch={handleSearch}
  />;
}
