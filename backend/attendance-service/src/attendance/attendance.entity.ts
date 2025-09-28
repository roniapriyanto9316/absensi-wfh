import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Attendance {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  userId: number;

  @Column({ type: 'timestamp', nullable: true })
  clockInAt?: Date;

  @Column({ type: 'timestamp', nullable: true })
  clockOutAt?: Date;

  @Column({ nullable: true })
  note?: string;
}
