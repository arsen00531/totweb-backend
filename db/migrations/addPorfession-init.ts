import { MigrationInterface, QueryRunner } from "typeorm";

export class AddProfessionInit1732997677319 implements MigrationInterface {
    name = 'AddProfessionInit1732997677319'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`INSERT INTO profession (name) VALUES ('Backend-developer');`);
        await queryRunner.query(`INSERT INTO profession (name) VALUES ('Frontend-developer');`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
    }

}
