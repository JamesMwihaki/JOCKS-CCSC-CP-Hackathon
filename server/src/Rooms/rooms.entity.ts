import { Entity, PrimaryColumn, Column, Unique } from "typeorm";

@Entity()
export class Rooms {
    @PrimaryColumn()
    id: number;

    @Column()
    buildings_locations: string;

    @Column()
    room_number: number;

    @Column({nullable: true})
    room_name: string;

    @Column({nullable: true})
    room_type: string;

    @Column({nullable: true})
    person: string;
}