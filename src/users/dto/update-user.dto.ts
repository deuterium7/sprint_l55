import { PartialType } from '@nestjs/mapped-types';
import { CreateUserDto } from './create-user.dto';
import { ApiProperty } from '@nestjs/swagger';
import { z } from 'zod';

export class UpdateUserDto extends PartialType(CreateUserDto) {
  @ApiProperty({ description: 'ФИО пользователя' })
  name: string;
}

export const updateUserSchema = z
  .object({
    name: z.string().min(2).max(255),
  })
  .required();

export type ZodDto = z.infer<typeof updateUserSchema>;
