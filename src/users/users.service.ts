import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/database/user.entity';
import { Repository } from 'typeorm';
type searcFilters = {
  name: string;
  age: number;
  gender: string;
};
@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
  ) {}

  findAll(): Promise<User[]> {
    return this.usersRepository.find();
  }

  findOne(id: number): Promise<User> {
    return this.usersRepository.findOneBy({ id });
  }

  async remove(id: number): Promise<void> {
    await this.usersRepository.delete(id);
  }
  async updateOne(id: number, user: User): Promise<User> {
    await this.usersRepository.update(id, user);
    return this.usersRepository.findOneBy({ id });
  }
  async inserOne(user: User): Promise<User> {
    return await this.usersRepository.save(user);
  }
  async filterUsers(user: searcFilters): Promise<User[]> {
    console.log('params', user);
    // return this.usersRepository.findBy({ ...user });
    const qb = this.usersRepository.createQueryBuilder('u');
    if (user.name)
      qb.where(`CONCAT(u.firstName,' ',u.lastName) LIKE '%${user.name}%'`);
    if (user.age) qb.andWhere(`u.age =${user.age}`);
    if (user.gender && user.gender !== 'All')
      qb.andWhere(`u.gender =${user.gender}`);

    return qb.getMany();
  }
}
