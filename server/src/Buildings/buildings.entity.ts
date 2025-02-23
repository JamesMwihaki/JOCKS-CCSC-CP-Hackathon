import { Entity, PrimaryColumn, Column } from "typeorm";

@Entity()
export class Buildings {
    @PrimaryColumn()
    id: number;

    @Column()
    buildings_locations: string;

    @Column({type: 'text', array: true, nullable: true})
    departments: string[]

    @Column()
    description: string;
}