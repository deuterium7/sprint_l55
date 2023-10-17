import { ApiProperty } from '@nestjs/swagger';
import { z } from 'zod';

export class CreateUserDto {
  @ApiProperty({ description: 'ФИО пользователя' })
  name: string;

  @ApiProperty({ description: 'Email' })
  email: string;

  @ApiProperty({ description: 'Пароль' })
  password: string;
}

export const createUserSchema = z
  .object({
    name: z.string().min(2).max(255),
    email: z.string().email(),
    password: z.string().min(6).max(20),
  })
  .required();

export type ZodDto = z.infer<typeof createUserSchema>;
