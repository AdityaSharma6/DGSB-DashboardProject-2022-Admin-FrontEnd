import { Dispatch, SetStateAction, createContext } from 'react';
import { UserContextModel } from './Models/User';

export type UserContextType = {
    user: UserContextModel | null,
    setUser: Dispatch<SetStateAction<UserContextModel | null>>,
}
export const UserContext = createContext<UserContextType>({
    user: null,
    setUser: () => {}
});