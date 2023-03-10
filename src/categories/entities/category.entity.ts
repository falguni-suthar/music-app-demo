import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Categories {
     split(arg0: string): any {
       throw new Error('Method not implemented.');
     }

     @PrimaryGeneratedColumn('uuid')
     id: string;

     @Column({ nullable: true })
     name: string;
}
