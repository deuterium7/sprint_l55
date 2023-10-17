import { ApiProperty } from '@nestjs/swagger';
import { z } from 'zod';

export class CreateCommentDto {
  @ApiProperty({ description: 'Сообщение' })
  message: string;

  @ApiProperty({
    description: 'ID пользователя',
    minimum: 1,
  })
  userId: number;

  @ApiProperty({
    description: 'ID задачи',
    minimum: 1,
  })
  taskId: number;
}

export const createCommentSchema = z
  .object({
    message: z.string().min(2).max(255),
    userId: z.number().nullable(),
    taskId: z.number().nullable(),
  })
  .required();

export type ZodDto = z.infer<typeof createCommentSchema>;
