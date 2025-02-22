import {config } from "dotenv";
import { Demo } from "./src/demo/demo.entity";
import { DataSource } from "typeorm";

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
        entities: [Demo]
    }
)