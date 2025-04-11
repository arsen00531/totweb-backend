import { MigrationInterface, QueryRunner } from "typeorm";

export class Init1744373466784 implements MigrationInterface {
    name = 'Init1744373466784'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "experience" ("id" SERIAL NOT NULL, "workPlace" character varying, "profession" character varying, "startDate" character varying, "endDate" character varying, "whatDo" character varying, "studentId" integer, CONSTRAINT "PK_5e8d5a534100e1b17ee2efa429a" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "company_token" ("id" SERIAL NOT NULL, "refreshToken" character varying, "browser" character varying NOT NULL, "companyId" integer, CONSTRAINT "PK_2c036058ba2f6d9aba7e85c9ff5" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TYPE "public"."company_roles_enum" AS ENUM('student', 'company', 'admin')`);
        await queryRunner.query(`CREATE TABLE "company" ("id" SERIAL NOT NULL, "companyName" character varying NOT NULL, "email" character varying NOT NULL, "contactPerson" character varying NOT NULL, "phone" character varying NOT NULL, "industry" character varying, "location" character varying, "size" character varying, "aboutUs" character varying array NOT NULL DEFAULT '{}', "contactEmail" character varying, "contactPhone" character varying, "site" character varying, "social" character varying, "projects" character varying array NOT NULL DEFAULT '{}', "reviews" character varying array NOT NULL DEFAULT '{}', "activateLink" character varying NOT NULL, "isActivated" boolean NOT NULL DEFAULT false, "roles" "public"."company_roles_enum" array NOT NULL DEFAULT '{company}', "password" character varying NOT NULL, CONSTRAINT "UQ_b0fc567cf51b1cf717a9e8046a1" UNIQUE ("email"), CONSTRAINT "UQ_e3fce009654e1af8f65f6ec4c60" UNIQUE ("activateLink"), CONSTRAINT "PK_056f7854a7afdba7cbd6d45fc20" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "profession" ("id" SERIAL NOT NULL, "name" character varying NOT NULL, CONSTRAINT "PK_7a54f88e18eaeb628aef171dc52" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TYPE "public"."vacancy_graphic_enum" AS ENUM('all', 'graphicFullDay', 'graphicChange', 'graphicElastic', 'graphicHome')`);
        await queryRunner.query(`CREATE TABLE "vacancy" ("id" SERIAL NOT NULL, "title" character varying NOT NULL, "description" character varying NOT NULL, "price" character varying, "city" character varying NOT NULL, "graphic" "public"."vacancy_graphic_enum" array NOT NULL DEFAULT '{all}', "duties" character varying array NOT NULL, "requirements" character varying array NOT NULL, "conditions" character varying array NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "companyId" integer, "professionId" integer, CONSTRAINT "PK_8fa1981f63bc24e1712707d492b" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "response" ("id" SERIAL NOT NULL, "studentId" integer, "vacancyId" integer, CONSTRAINT "PK_f64544baf2b4dc48ba623ce768f" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TYPE "public"."student_roles_enum" AS ENUM('student', 'company', 'admin')`);
        await queryRunner.query(`CREATE TABLE "student" ("id" SERIAL NOT NULL, "firstName" character varying NOT NULL, "lastName" character varying NOT NULL, "email" character varying NOT NULL, "university" character varying, "lastYear" integer, "contactEmail" character varying, "contactPhone" character varying, "keySkills" character varying array NOT NULL DEFAULT '{}', "preferredFields" character varying array NOT NULL DEFAULT '{}', "locationPreferences" character varying array NOT NULL DEFAULT '{}', "activateLink" character varying NOT NULL, "isActivated" boolean NOT NULL DEFAULT false, "roles" "public"."student_roles_enum" array NOT NULL DEFAULT '{student}', "password" character varying NOT NULL, "photo" character varying, "profession" character varying, CONSTRAINT "UQ_a56c051c91dbe1068ad683f536e" UNIQUE ("email"), CONSTRAINT "UQ_8a3cab838ec5a27e8af9591a5cd" UNIQUE ("activateLink"), CONSTRAINT "PK_3d8016e1cb58429474a3c041904" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "student_token" ("id" SERIAL NOT NULL, "refreshToken" character varying, "browser" character varying NOT NULL, "studentId" integer, CONSTRAINT "PK_18857f9fb160efd80c70d60c2c1" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "notification" ("id" SERIAL NOT NULL, "companyId" integer, "studentId" integer, "vacancyId" integer, CONSTRAINT "PK_705b6c7cdf9b2c2ff7ac7872cb7" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "experience" ADD CONSTRAINT "FK_6f2d756e40dce284c0b8f7fc0d6" FOREIGN KEY ("studentId") REFERENCES "student"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "company_token" ADD CONSTRAINT "FK_c267fbd5e221eeff28f3b39339a" FOREIGN KEY ("companyId") REFERENCES "company"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "vacancy" ADD CONSTRAINT "FK_b7eb633ebbbdff1d21907939e10" FOREIGN KEY ("companyId") REFERENCES "company"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "vacancy" ADD CONSTRAINT "FK_ef8db31245ccc8506f406ecf96c" FOREIGN KEY ("professionId") REFERENCES "profession"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "response" ADD CONSTRAINT "FK_eff0e5cca630472cfe8f736ee11" FOREIGN KEY ("studentId") REFERENCES "student"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "response" ADD CONSTRAINT "FK_ce4fba5051973f764df3edd19f8" FOREIGN KEY ("vacancyId") REFERENCES "vacancy"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "student_token" ADD CONSTRAINT "FK_1914c8e7bf9d02f49d08558a20e" FOREIGN KEY ("studentId") REFERENCES "student"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "notification" ADD CONSTRAINT "FK_ec0adb47d5237aef2018e3a9745" FOREIGN KEY ("companyId") REFERENCES "company"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "notification" ADD CONSTRAINT "FK_82a1d652dcc581f14ec716595e9" FOREIGN KEY ("studentId") REFERENCES "student"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "notification" ADD CONSTRAINT "FK_fe2b423f44b79506e2598bb99c3" FOREIGN KEY ("vacancyId") REFERENCES "vacancy"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "notification" DROP CONSTRAINT "FK_fe2b423f44b79506e2598bb99c3"`);
        await queryRunner.query(`ALTER TABLE "notification" DROP CONSTRAINT "FK_82a1d652dcc581f14ec716595e9"`);
        await queryRunner.query(`ALTER TABLE "notification" DROP CONSTRAINT "FK_ec0adb47d5237aef2018e3a9745"`);
        await queryRunner.query(`ALTER TABLE "student_token" DROP CONSTRAINT "FK_1914c8e7bf9d02f49d08558a20e"`);
        await queryRunner.query(`ALTER TABLE "response" DROP CONSTRAINT "FK_ce4fba5051973f764df3edd19f8"`);
        await queryRunner.query(`ALTER TABLE "response" DROP CONSTRAINT "FK_eff0e5cca630472cfe8f736ee11"`);
        await queryRunner.query(`ALTER TABLE "vacancy" DROP CONSTRAINT "FK_ef8db31245ccc8506f406ecf96c"`);
        await queryRunner.query(`ALTER TABLE "vacancy" DROP CONSTRAINT "FK_b7eb633ebbbdff1d21907939e10"`);
        await queryRunner.query(`ALTER TABLE "company_token" DROP CONSTRAINT "FK_c267fbd5e221eeff28f3b39339a"`);
        await queryRunner.query(`ALTER TABLE "experience" DROP CONSTRAINT "FK_6f2d756e40dce284c0b8f7fc0d6"`);
        await queryRunner.query(`DROP TABLE "notification"`);
        await queryRunner.query(`DROP TABLE "student_token"`);
        await queryRunner.query(`DROP TABLE "student"`);
        await queryRunner.query(`DROP TYPE "public"."student_roles_enum"`);
        await queryRunner.query(`DROP TABLE "response"`);
        await queryRunner.query(`DROP TABLE "vacancy"`);
        await queryRunner.query(`DROP TYPE "public"."vacancy_graphic_enum"`);
        await queryRunner.query(`DROP TABLE "profession"`);
        await queryRunner.query(`DROP TABLE "company"`);
        await queryRunner.query(`DROP TYPE "public"."company_roles_enum"`);
        await queryRunner.query(`DROP TABLE "company_token"`);
        await queryRunner.query(`DROP TABLE "experience"`);
    }

}
