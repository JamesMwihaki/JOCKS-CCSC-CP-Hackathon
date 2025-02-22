import { MigrationInterface, QueryRunner } from "typeorm";

export class Tables1740254332427 implements MigrationInterface {
    name = 'Tables1740254332427'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "demo" ("id" integer NOT NULL, "info" character varying NOT NULL, "data" character varying NOT NULL, CONSTRAINT "PK_9d8d89f7764de19ec5a40a5f056" PRIMARY KEY ("id"))`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE "demo"`);
    }

}
