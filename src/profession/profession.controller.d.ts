import { ProfessionService } from './profession.service';
import { CreateProfessionDto } from './dto/createProfession.dto';
export declare class ProfessionController {
    private readonly professionService;
    constructor(professionService: ProfessionService);
    create(createProfessionDto: CreateProfessionDto): Promise<CreateProfessionDto & import("./entities/profession.entity").Profession>;
    findAll(): Promise<import("./entities/profession.entity").Profession[]>;
}
