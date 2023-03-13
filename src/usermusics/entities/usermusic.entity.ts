import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Usermusic {

     @PrimaryGeneratedColumn('uuid')
     id: string;

     @Column()
     userId: string;

     @Column()
     image:string;

     @Column()
     imageLocation: string;

     @Column()
     musicFile: string;

     @Column()
     musicLocation: string

     @Column()
     name: string;

     @Column({ type: 'time'})
     duration: string;

}
