import {config } from "dotenv";
import { Buildings } from "./src/Buildings/buildings.entity";
import { DataSource } from "typeorm";
import { Rooms } from "./src/Rooms/rooms.entity";

config();

export default new DataSource(
    {
        type: 'postgres',
        host: 'localhost',
        port: 5432,
        username: 'user',
        password: 'password',
        database: 'database',
        migrations: ['migrations/**'],
        synchronize: false,
        entities: [Buildings, Rooms]
    }
)