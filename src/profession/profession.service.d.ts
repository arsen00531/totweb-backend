import { Profession } from './entities/profession.entity';
import { Repository } from 'typeorm';
import { CreateProfessionDto } from './dto/createProfession.dto';
export declare class ProfessionService {
    private readonly professionRepository;
    constructor(professionRepository: Repository<Profession>);
    create(createProfessionDto: CreateProfessionDto): Promise<CreateProfessionDto & Profession>;
    findAll(): Promise<Profession[]>;
    findOne(id: number): Promise<Profession>;
}
