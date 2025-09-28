import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn } from 'typeorm';

@Entity()
export class AuditLog {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  action: string; 

  @Column({ nullable: true })
  performedBy: number; 

  @Column({ type: 'json', nullable: true })
  data: any; 

  @CreateDateColumn({ type: 'timestamptz', nullable: true })
  createdAt: Date;
}
