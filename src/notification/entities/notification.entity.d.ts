import { Company } from 'src/company/entities/company.entity';
import { Student } from 'src/student/entities/student.entity';
import { Vacancy } from 'src/vacancy/entities/vacancy.entity';
export declare class Notification {
    id: number;
    company: Company;
    student: Student;
    vacancy: Vacancy;
}
