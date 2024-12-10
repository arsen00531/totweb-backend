import { FileService } from './file.service';
export declare class FileController {
    private readonly fileService;
    constructor(fileService: FileService);
    getFile(path: string): Promise<Buffer>;
}
