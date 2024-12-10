import { Student } from 'src/student/entities/student.entity';
export declare class StudentToken {
    id: number;
    refreshToken: string;
    browser: string;
    student: Student;
}
