declare global {
  interface TokenInfo {
    accessToken: string;
    refreshToken: string;
    user: UserType;
  }
}

export {};
