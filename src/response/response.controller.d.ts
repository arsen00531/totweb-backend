import { ResponseService } from './response.service';
import { CreateResponseDto } from './dto/createResponse.dto';
export declare class ResponseController {
    private readonly responseService;
    constructor(responseService: ResponseService);
    create(createResponseDto: CreateResponseDto): Promise<{
        student: import("src/student/entities/student.entity").Student;
        vacancy: import("../vacancy/entities/vacancy.entity").Vacancy;
    } & import("./entities/response.entity").Response>;
    getCompanyResponses(companyId: number): Promise<import("./entities/response.entity").Response[]>;
    getVacancyResponses(vacancyId: number): Promise<import("./entities/response.entity").Response[]>;
    getStudentResponses(studentId: number): Promise<import("./entities/response.entity").Response[]>;
}
