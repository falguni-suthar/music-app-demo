import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Categories {

     @PrimaryGeneratedColumn('uuid')
     id: string;

     @Column({ nullable: true })
     name: string;
}
