import { Entity, PrimaryColumn, Column } from "typeorm";

@Entity()
export class Demo {
    @PrimaryColumn()
    id: number;

    @Column()
    info: string;

}