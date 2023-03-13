import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity('musicCategories')
export class musicCategories {
     @PrimaryGeneratedColumn('uuid')
     id: string;

     @Column()
     musicId: string;

     
     @Column()
     categoryId: string;
}