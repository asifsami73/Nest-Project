import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './user.entity';
export const dbModule = TypeOrmModule.forRoot({
  type: 'mysql',
  host: 'localhost',
  port: 3306,
  username: 'root',
  password: '1122',
  database: 'nest_project',
  entities: [User],
  synchronize: true,
});
