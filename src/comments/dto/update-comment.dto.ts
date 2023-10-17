import { PartialType } from '@nestjs/mapped-types';
import { CreateCommentDto } from './create-comment.dto';
import { ApiProperty } from '@nestjs/swagger';
import { z } from 'zod';

export class UpdateCommentDto extends PartialType(CreateCommentDto) {
  @ApiProperty({ description: 'Сообщение' })
  message: string;
}

export const updateCommentSchema = z
  .object({
    message: z.string().min(2).max(255),
  })
  .required();

export type ZodDto = z.infer<typeof updateCommentSchema>;
