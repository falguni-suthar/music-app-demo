import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Usermusic {

     @PrimaryGeneratedColumn('uuid')
     id: string;

     @Column()
     userId: string;

     @Column()
     image:string;

     @Column()
     name: string;

     @Column({ type: 'time'})
     duration: string;
}
