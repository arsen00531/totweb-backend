import { Graphic } from '../entities/vacancy.entity';
export declare class FindAllQuery {
    page?: number;
    limit?: number;
    search?: string;
    city?: string;
    graphic?: Graphic[];
    professionIds: number[];
}
