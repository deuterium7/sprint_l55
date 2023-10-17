import { Controller, Post, Get, Body } from '@nestjs/common';
import { ModerationService } from './moderation.service';

@Controller('moderation')
export class ModerationController {
  constructor(private readonly service: ModerationService) {}

  @Post()
  async create(@Body() data: any) {
    this.service.moderate(parseInt(data.comment_id));
    return { message: 'Добавлено на модерацию!' };
  }

  @Get()
  findAll() {
    return this.service.getJobs();
  }
}
