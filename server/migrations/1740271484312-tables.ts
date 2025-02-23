import { MigrationInterface, QueryRunner } from "typeorm";

export class Tables1740271484312 implements MigrationInterface {
    name = 'Tables1740271484312'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "buildings" ("id" integer NOT NULL, "buildings_locations" character varying NOT NULL, "departments" text[], "description" character varying NOT NULL, CONSTRAINT "PK_bc65c1acce268c383e41a69003a" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "rooms" ("id" integer NOT NULL, "buildings_locations" character varying NOT NULL, "room_number" integer NOT NULL, "room_name" character varying, "room_type" character varying, "person" character varying, CONSTRAINT "PK_0368a2d7c215f2d0458a54933f2" PRIMARY KEY ("id"))`);
    
        // Buildings Table

        await queryRunner.query(`INSERT INTO buildings (id, buildings_locations, departments, description) VALUES (0, 'Osborne Hall', ARRAY[''], '')`)
        await queryRunner.query(`INSERT INTO buildings (id, buildings_locations, departments, description) VALUES (1, 'Cunningham Center', ARRAY[''], '')`)
        await queryRunner.query(`INSERT INTO buildings (id, buildings_locations, departments, description) VALUES (2, 'Harvest Statue', ARRAY[''], '')`)
        await queryRunner.query(`INSERT INTO buildings (id, buildings_locations, departments, description) VALUES (3, 'Bell Center', ARRAY[''], '')`)
        await queryRunner.query(`INSERT INTO buildings (id, buildings_locations, departments, description) VALUES (4, 'Lunn Hall', ARRAY[''], '')`)
        await queryRunner.query(`INSERT INTO buildings (id, buildings_locations, departments, description) VALUES (5, 'Smith', ARRAY[''], '')`)
        await queryRunner.query(`INSERT INTO buildings (id, buildings_locations, departments, description) VALUES (6, 'Metz', ARRAY[''], '')`)

        // Rooms Table

        await queryRunner.query(`INSERT INTO rooms (id, buildings_locations, room_number, room_name, room_type, person) VALUES (0, 'Osborne Hall', 204, NULL, 'classroom', NULL)`)
        await queryRunner.query(`INSERT INTO rooms (id, buildings_locations, room_number, room_name, room_type, person) VALUES (1, 'Osborne Hall', 106, NULL, 'classroom', NULL)`)
        await queryRunner.query(`INSERT INTO rooms (id, buildings_locations, room_number, room_name, room_type, person) VALUES (2, 'Cunnintham Center', 204, 'Rexroth Collab', NULL, NULL)`)
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE "rooms"`);
        await queryRunner.query(`DROP TABLE "buildings"`);
    }

}
