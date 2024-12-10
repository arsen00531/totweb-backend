"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.FileService = void 0;
const common_1 = require("@nestjs/common");
const promises_1 = require("fs/promises");
const path_1 = require("path");
const uuid_1 = require("uuid");
let FileService = class FileService {
    constructor() {
        this.basicPath = (0, path_1.resolve)(__dirname, '..', 'uploads');
    }
    async getFile(filePath) {
        try {
            const file = await (0, promises_1.readFile)((0, path_1.resolve)(this.basicPath, filePath));
            return file;
        }
        catch (error) {
            throw new common_1.BadRequestException('file was not found');
        }
    }
    async uploadFile(file, fileDir) {
        try {
            if (!file) {
                throw new common_1.BadRequestException('File was not found');
            }
            const dirPath = (0, path_1.resolve)(this.basicPath, fileDir);
            await this.createDir(this.basicPath);
            await this.createDir(dirPath);
            const fileName = `${(0, uuid_1.v4)()}.jpg`;
            await (0, promises_1.writeFile)((0, path_1.resolve)(dirPath, fileName), file.buffer);
            return { fileDir, fileName };
        }
        catch (error) {
            console.log('File wasnt write', error);
            return { fileDir: '', fileName: '' };
        }
    }
    async createDir(path) {
        try {
            await (0, promises_1.access)(path);
        }
        catch (error) {
            await (0, promises_1.mkdir)(path);
        }
    }
};
exports.FileService = FileService;
exports.FileService = FileService = __decorate([
    (0, common_1.Injectable)()
], FileService);
//# sourceMappingURL=file.service.js.map