import { Column, Entity, PrimaryGeneratedColumn, Timestamp } from "typeorm";

@Entity()
export class User {
     @PrimaryGeneratedColumn('uuid')
     id: string;

     @Column({ type: 'boolean', nullable: true })
     deviceType: boolean;

     @Column({ nullable: true })
     deviceId: string;

     @Column({ nullable: true })
     fcmToken: string;

     @Column()
     username: string;

     @Column()
     email: string;

     @Column()
     password: string

     @Column({ type: 'date', nullable: true })
     dob: Date;

     @Column({ type:'bigint' })
     phone: number;

     @Column({ type: 'boolean', default: false })
     emailVerified: boolean;

     @Column({ type: 'boolean', default: true})
     isActive: boolean;

     // @Column()
     // otp: string;

     // @Column()
     // emailSendTime: number;

     // @Column()
     // emailExpTime: number;
}
