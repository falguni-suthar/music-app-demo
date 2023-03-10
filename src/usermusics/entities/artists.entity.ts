import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Artists {
     @PrimaryGeneratedColumn('uuid')
     id: string;

     @Column()
     musicId: string;

     @Column()
     name: string;
}