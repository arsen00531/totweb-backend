import { Role } from 'src/user/entities/user.entity';

export type TRefreshPayload = {
  clientAgent: string;
  userId: number;
  email: string;
  role: Role;
};

export type TAccessPayload = {
  userId: number;
  email: string;
  role: Role;
};
