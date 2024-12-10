import { Role } from 'src/student/entities/student.entity';
export type TRefreshStudentPayload = {
    clientAgent: string;
    studentId: number;
    email: string;
    role: Role[];
};
export type TAccessStudentPayload = {
    studentId: number;
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
