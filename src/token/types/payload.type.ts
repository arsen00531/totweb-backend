import { Role } from 'src/student/entities/student.entity';

export type TRefreshUserPayload = {
  clientAgent: string;
  userId: number;
  email: string;
  role: Role[];
};

export type TAccessUserPayload = {
  userId: number;
  email: string;
  role: Role[];
};

export type TRefreshCompanyPayload = {
  clientAgent: string;
  companyId: number;
  email: string;
  role: Role[];
};

export type TAccessCompanyPayload = {
  companyId: number;
  email: string;
  role: Role[];
};
