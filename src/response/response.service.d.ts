import { Response } from './entities/response.entity';
import { Repository } from 'typeorm';
import { CreateResponseDto } from './dto/createResponse.dto';
import { StudentService } from 'src/student/student.service';
import { VacancyService } from 'src/vacancy/vacancy.service';
export declare class ResponseService {
    private readonly responseRepository;
    private readonly studentService;
    private readonly vacancyService;
    constructor(responseRepository: Repository<Response>, studentService: StudentService, vacancyService: VacancyService);
    create(createResponseDto: CreateResponseDto): Promise<{
        student: import("../student/entities/student.entity").Student;
        vacancy: import("../vacancy/entities/vacancy.entity").Vacancy;
    } & Response>;
    getCompanyResponses(companyId: number): Promise<Response[]>;
    getVacancyResponses(vacancyId: number): Promise<Response[]>;
    getStudentResponses(studentId: number): Promise<Response[]>;
}
