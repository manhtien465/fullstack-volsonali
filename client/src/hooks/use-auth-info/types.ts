
export interface IAuthInfoState {
  userState?: any;
  userAvatar?: string;
  userFullName?: string;
  
}

export interface IAuthInfoAction {
  setUserState(userState?: any): void;
  setNewToken(newToken?: string, newRefreshToken?: string): void;
  setUserAvatar(newAvatar?: string): void;
  setUserFullName(newFullName?: string): void;
  clearAll(): void;
}
