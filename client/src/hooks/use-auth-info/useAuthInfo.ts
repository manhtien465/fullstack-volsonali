import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';
import type { IAuthInfoAction, IAuthInfoState } from './types.ts';

const useAuthInfo = create<IAuthInfoState & IAuthInfoAction>()(
  persist(
    (set, get) => {
      return {
        userState: undefined,
        userAvatar: undefined,
        userFullName: undefined,
        currentPermission: undefined,
        permissions: [],
        setUserState(userStateValue) {
          set({ userState: userStateValue });
        },
        setNewToken(newToken: string, newRefreshToken: string) {
          const { userState: curUserState } = get();
          set({
            userState: {
              ...curUserState,
              refreshToken: newRefreshToken,
              accessToken: newToken,
            } as any,
          });
        },
        setUserAvatar(newAvatar: string) {
          set({
            userAvatar: newAvatar,
          });
        },
        setUserFullName(newFullName: string) {
          set({
            userFullName: newFullName,
          });
        },
       
        clearAll() {
          set({
            userState: undefined,
            userAvatar: undefined,
            userFullName: undefined,
          });
        },
      };
    },
    {
      name: 'lazy-blog-auth',
      storage: createJSONStorage(() => localStorage),
    },
  ),
);

export default useAuthInfo;
