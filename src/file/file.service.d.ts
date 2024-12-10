import { MemoryStoredFile } from 'nestjs-form-data';
export declare class FileService {
    private readonly basicPath;
    getFile(filePath: string): Promise<Buffer>;
    uploadFile(file: MemoryStoredFile, fileDir: string): Promise<{
        fileDir: string;
        fileName: string;
    }>;
    createDir(path: string): Promise<void>;
}
