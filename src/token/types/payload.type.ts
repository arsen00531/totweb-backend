export type TRefreshPayload = {
  tokenId?: number;
  userId: number;
  email: string;
};

export type TAccessPayload = {
  userId: number;
  email: string;
};
