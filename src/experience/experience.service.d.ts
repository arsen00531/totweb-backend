import { Experience } from './entities/experience.entity';
import { Repository } from 'typeorm';
import { AddExperienceDto } from './dto/addExperience.dto';
import { Student } from 'src/student/entities/student.entity';
export declare class ExperienceService {
    private readonly experienceRepository;
    constructor(experienceRepository: Repository<Experience>);
    add(addExperienceDtos: AddExperienceDto[], student: Student): Promise<void>;
    remove(experienceIds: number[]): Promise<Experience[]>;
}
