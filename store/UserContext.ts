import { createContext, SetStateAction, Dispatch } from "react";
import { User } from "../types/User";

type UserContextState = {
  user: User;
  setUser: Dispatch<SetStateAction<User>>;
};

const UserContext = createContext({} as UserContextState);

export default UserContext;
