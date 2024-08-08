"use client";
import {
  Dispatch,
  ReactNode,
  SetStateAction,
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import { api, RouterInputs, RouterOutputs } from "@/trpc/react";
import { User } from "next-auth";

type AdminContextProps = {
  selected?: User;
  users?: RouterOutputs["admin"]["searchUsers"];
  usersLoading: boolean;
  query: string;
  setQuery: Dispatch<SetStateAction<string>>;
  search: ({ query }: RouterInputs["admin"]["searchUsers"]) => Promise<RouterOutputs["admin"]["searchUsers"]>;
  setSelected: Dispatch<SetStateAction<User | undefined>>;
  setOpen: Dispatch<SetStateAction<string | null>>;
  open: string | null
};
export const AdminContext = createContext<AdminContextProps>({
  users: [],
  query: "",
  setQuery: () => null,
  usersLoading: false,
  search: async () => [],
  selected: { id: "", name: "", image: "", role: "admin" },
  setSelected: () => null,
  open: null,
  setOpen: () => null
});
export const useAdmin = () => useContext(AdminContext);

export const AdminProvider = ({
  children,
}: {
  children: ReactNode;
}) => {
  const [selected, setSelected] = useState<User | undefined>();
  const [open, setOpen] = useState<string | null>(null);
  const [query, setQuery] = useState("");
  const {
    data: users,
    isPending: usersLoading,
    error: prodsError,
    mutateAsync: search,
  } = api.admin.searchUsers.useMutation();

  const onSaveClick = (sel: User) => {
    console.log("saved", sel.name)
  }
  return (
    <AdminContext.Provider
      value={{
        query, setQuery,
        selected, setSelected,
        open, setOpen,
        users,
        usersLoading,
        search,
      }}
    >
      {children}
    </AdminContext.Provider>
  );
};
