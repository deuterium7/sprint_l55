import { PartialType } from '@nestjs/mapped-types';
import { CreateTaskDto } from './create-task.dto';
import { taskStatusEnum } from '../entities/task.entity';
import { ApiProperty } from '@nestjs/swagger';
import { z } from 'zod';

export class UpdateTaskDto extends PartialType(CreateTaskDto) {
  @ApiProperty({ description: 'Заголовок' })
  title: string;

  @ApiProperty({ description: 'Описание задачи' })
  description: string;

  @ApiProperty({ description: 'Статус' })
  status: taskStatusEnum;
}

export const updateTaskSchema = z
  .object({
    title: z.string().min(2).max(255),
    status: z.string(),
    description: z.string().min(2).max(255),
  })
  .required();

export type ZodDto = z.infer<typeof updateTaskSchema>;
