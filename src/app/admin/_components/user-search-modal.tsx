import { Button } from "@/components/ui/button";
import { Modal } from "@/components/ui/modal";
import {
  Dispatch,
  SetStateAction,
  useCallback,
  useState,
} from "react";
import { api } from "@/trpc/react";
import { User } from "next-auth";
import { UserSearch } from "../profile/_components/user-search";
import { BottomButtons } from "@/app/catering/_components/bottom-buttons";

export function UserSearchModal({
  open, closeModal, userId, setUserId
}: {
  open: boolean, closeModal: () => void
  userId?: string, setUserId: Dispatch<SetStateAction<string | undefined>>
}) {
  const [selected, setSelected] = useState<User | undefined>();
  const {
    data: users,
    isPending: usersLoading,
    mutateAsync: search,
  } = api.admin.searchUsers.useMutation();
  const handleSearch = (value: string) => {
    if (value.trim() == "" || value.length < 3) return;
    search({ query: value });
  };
  const handleUserClick = (user: User) => {
    if (selected?.id !== user.id) {
      setSelected(user);
      if (userId !== user.id) setUserId(user.id)
    }
  };
  return (
    <Modal
      isOpen={open}
      closeModal={closeModal}
      className="h-[500px] w-[1000px]"
    >
      <div className="relative flex flex-col items-center 
        w-full">
        <div className="h-[380px] w-full flex justify-center overflow-y-auto">
          <UserSearch
            selected={selected}
            users={users}
            usersLoading={usersLoading}
            handleUserClick={handleUserClick}
            handleSearch={handleSearch}
          />
        </div>
        {
          selected ?
            <div className="absolute pt-12 bottom-0 flex w-full justify-center">
              <BottomButtons
                size="sm"
                saveText={`Save menu for ${selected?.name?.split(" ")[0]}`}
              />
            </div>
            : null
        }
      </div>
    </Modal>
  );
}
