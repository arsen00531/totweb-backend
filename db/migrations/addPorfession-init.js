"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AddProfessionInit1732997677319 = void 0;
class AddProfessionInit1732997677319 {
    constructor() {
        this.name = 'AddProfessionInit1732997677319';
    }
    async up(queryRunner) {
        await queryRunner.query(`INSERT INTO profession (name) VALUES ('Backend-developer');`);
        await queryRunner.query(`INSERT INTO profession (name) VALUES ('Frontend-developer');`);
    }
    async down(queryRunner) {
    }
}
exports.AddProfessionInit1732997677319 = AddProfessionInit1732997677319;
//# sourceMappingURL=addPorfession-init.js.map