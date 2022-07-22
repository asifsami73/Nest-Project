import { Entity, Column, PrimaryGeneratedColumn, AfterLoad } from 'typeorm';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  firstName: string;

  @Column()
  lastName: string;

  @Column()
  age: number;

  @Column()
  gender: number;
  @Column({ default: true })
  isActive: boolean;
  fullName: string;
  @AfterLoad()
  afterLoad() {
    return (this.fullName = `${this.firstName} ${this.lastName}`);
  }
}
