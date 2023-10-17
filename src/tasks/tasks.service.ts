import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Task } from './entities/task.entity';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';

@Injectable()
export class TasksService {
  constructor(
    @InjectRepository(Task)
    private repository: Repository<Task>,
  ) {}

  create(data: CreateTaskDto): Promise<Task> {
    return this.repository.save({ ...data });
  }

  findAll(): Promise<Task[]> {
    return this.repository.find();
  }

  findOne(id: number): Promise<Task | null> {
    return this.repository.findOneBy({ id });
  }

  update(id: number, data: UpdateTaskDto): Promise<Task> {
    return this.repository.save({ ...data, id });
  }

  async remove(id: number): Promise<void> {
    await this.repository.delete(id);
  }
}
