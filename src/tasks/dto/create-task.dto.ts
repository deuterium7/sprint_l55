import { ApiProperty } from '@nestjs/swagger';
import { z } from 'zod';

export class CreateTaskDto {
  @ApiProperty({ description: 'Заголовок' })
  title: string;

  @ApiProperty({ description: 'Описание задачи' })
  description: string;
}

export const createTaskSchema = z
  .object({
    title: z.string().min(2).max(255),
    description: z.string().min(2).max(255),
  })
  .required();

export type ZodDto = z.infer<typeof createTaskSchema>;
