import * as bcrypt from 'bcrypt';
import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private repository: Repository<User>,
  ) {}

  async register(data: CreateUserDto): Promise<User> {
    const saltOrRounds = 10;
    data.password = await bcrypt.hash(data.password, saltOrRounds);

    return await this.repository.save(data);
  }

  findAll(): Promise<User[]> {
    return this.repository.find();
  }

  findOne(email: string): Promise<User | null> {
    return this.repository.findOneBy({ email });
  }

  update(id: number, data: UpdateUserDto): Promise<User> {
    return this.repository.save({ ...data, id });
  }

  async remove(id: number): Promise<void> {
    await this.repository.delete(id);
  }
}
