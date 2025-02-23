import { MigrationInterface, QueryRunner } from "typeorm";

export class Tables1740280612222 implements MigrationInterface {
    name = 'Tables1740280612222'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "buildings" ("id" integer NOT NULL, "buildings_locations" character varying NOT NULL, "departments" text array, "description" character varying NOT NULL, "image" character varying NOT NULL, CONSTRAINT "PK_bc65c1acce268c383e41a69003a" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "rooms" ("id" integer NOT NULL, "buildings_locations" character varying NOT NULL, "room_number" integer NOT NULL, "room_name" character varying, "room_type" character varying, "person" character varying, CONSTRAINT "PK_0368a2d7c215f2d0458a54933f2" PRIMARY KEY ("id"))`);
        
        // Buildings Table

        await queryRunner.query(`INSERT INTO buildings (id, buildings_locations, departments, description, image) VALUES (0, 'Osborne Hall', ARRAY[''], 'Osborne Hall houses the Department of Natural Health and Mathematic Sciences.', '')`)
        await queryRunner.query(`INSERT INTO buildings (id, buildings_locations, departments, description, image) VALUES (1, 'Cunningham Center', ARRAY[''], 'The Cunningham Student Center is the hub for student activities, studying and dining services. It houses the cafeteria, coffee shop, Pioneer Store, Post Office, Student Development and Admissions.', '')`)
        await queryRunner.query(`INSERT INTO buildings (id, buildings_locations, departments, description, image) VALUES (2, 'Harvest Statue', ARRAY[''], 'The Harvest Prayer sculpture stands at the center of campus, central to one of our most unique traditions. During orientation, new students write their hopes for their time at MNU. Gathering with peers, professors and parents, they "plant" their dreams asking God to multiply their hopes. At graduation, seniors return for the Harvest Prayer, prepared to carry their gifts into the world.', '')`)
        await queryRunner.query(`INSERT INTO buildings (id, buildings_locations, departments, description, image) VALUES (3, 'Bell Cultural Events Center', ARRAY[''], 'The 40,000 square foot Bell Cultural Events Center is a busy complex, hosting over 320 events representing more than 70,000 guests throughout the year, not including regular classes. The center is used to showcase the talents of the MNU Fine and Performing Arts students and local artists and performing arts companies, and is available for use by the surrounding community as well as the Kansas City metro.', 'BellFront')`)
        await queryRunner.query(`INSERT INTO buildings (id, buildings_locations, departments, description, image) VALUES (4, 'Lunn Hall', ARRAY[''], 'Lunn Hall contains the Office of the Registrar, Student Accounts, Financial Aid, and Human Resources. Lunn Hall also houses the office of the President, Academic Affairs, Church Relations, and University Advancement Offices', '')`)
        await queryRunner.query(`INSERT INTO buildings (id, buildings_locations, departments, description, image) VALUES (5, 'Smith', ARRAY[''], 'Smith Hall houses the Department of Christian Ministry and Formation as well as many of our general education courses.', '')`)
        await queryRunner.query(`INSERT INTO buildings (id, buildings_locations, departments, description, image) VALUES (6, 'Metz', ARRAY[''], 'Metz Hall houses our Social and Behavioral Sciences, Business and Communication, and Education departments, as well as our graduate school offices for Education and Counseling. Inside Metz, you will also find a large computer lab for students to use.', '')`)
        await queryRunner.query(`INSERT INTO buildings (id, buildings_locations, departments, description, image) VALUES (7, 'Dobson Hall', ARRAY[''], 'Dobson Hall contains an art studio, and the offices of Information Technology.', 'DobsonFront')`)

        // Rooms Table

        await queryRunner.query(`INSERT INTO rooms (id, buildings_locations, room_number, room_name, room_type, person) VALUES (0, 'Osborne Hall', 204, NULL, 'classroom', NULL)`)
        await queryRunner.query(`INSERT INTO rooms (id, buildings_locations, room_number, room_name, room_type, person) VALUES (1, 'Osborne Hall', 106, NULL, 'classroom', NULL)`)
        await queryRunner.query(`INSERT INTO rooms (id, buildings_locations, room_number, room_name, room_type, person) VALUES (2, 'Cunningham Center', 204, 'Rexroth Collab', NULL, NULL)`)
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE "rooms"`);
        await queryRunner.query(`DROP TABLE "buildings"`);
    }

}
