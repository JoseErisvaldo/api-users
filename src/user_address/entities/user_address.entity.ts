import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
} from 'typeorm';

@Entity('user_address')
export class UserAddress {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  user_id: number;

  @Column({ type: 'text' })
  street: string;

  @Column({ type: 'text' })
  number: string;

  @Column({ type: 'text' })
  city: string;

  @Column({ type: 'text' })
  state: string;

  @Column({ type: 'text' })
  postal_code: string;

  @Column({ type: 'text', nullable: true })
  complement?: string;

  @CreateDateColumn({ type: 'timestamp' })
  created_at: Date;
}
