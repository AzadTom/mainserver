import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  Index,
} from 'typeorm';

export enum UserStatus {
  ACTIVE = 'ACTIVE',
  INACTIVE = 'INACTIVE',
  BLOCKED = 'BLOCKED',
}

export enum AuthProvider {
  GOOGLE = 'GOOGLE',
  FACEBOOK = 'FACEBOOK',
}

@Entity('users')
export class User {
  @PrimaryGeneratedColumn('uuid')
  id!: string;

  @Column()
  username!: string;

  @Index({ unique: true })
  @Column()
  email!: string;

  @Column()
  password!: string;

  @Column({ name: 'reset_password_token_hash', type: 'varchar', nullable: true })
  resetPasswordTokenHash!: string | null;

  @Column({ name: 'reset_password_expires_at', type: 'timestamp', nullable: true })
  resetPasswordExpiresAt!: Date | null;

  @Column({ name: 'refresh_token_hash', type: 'varchar', nullable: true })
  refreshTokenHash!: string | null;

  @Column({ name: 'refresh_token_expires_at', type: 'timestamp', nullable: true })
  refreshTokenExpiresAt!: Date | null;


  @Column({ name: 'is_active', type: 'enum', enum: UserStatus, default: UserStatus.ACTIVE })
  isActive!: UserStatus;

  @Column({ name: 'google_id', type: 'varchar', nullable: true })
  googleId!: string | null;

  @Column({ name: 'social', type: 'enum', enum: AuthProvider, nullable: true })
  social!: AuthProvider | null;

  @Column({ name: 'product_name', type: 'varchar', nullable: true })
  productName!: string | null;

  @CreateDateColumn()
  createdAt!: Date;

  @UpdateDateColumn()
  updatedAt!: Date;

}
