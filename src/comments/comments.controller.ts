import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
} from '@nestjs/common';
import { CommentsService } from './comments.service';
import { CreateCommentDto } from './dto/create-comment.dto';
import { UpdateCommentDto } from './dto/update-comment.dto';
import { ApiResponse, ApiTags } from '@nestjs/swagger';
import { Comment } from './entities/comment.entity';
import { AuthGuard } from '@nestjs/passport';

@UseGuards(AuthGuard('jwt'))
@ApiTags('Comments')
@Controller('comments')
export class CommentsController {
  constructor(private readonly commentsService: CommentsService) {}

  @ApiResponse({
    status: 200,
    description: 'Успешная операция',
    type: Comment,
    isArray: true,
  })
  @ApiResponse({ status: 401, description: 'Пользователь неавторизован' })
  @Get()
  findAll(): Promise<Comment[]> {
    return this.commentsService.findAll();
  }

  @ApiResponse({ status: 201, description: 'Успешная операция', type: Comment })
  @ApiResponse({ status: 401, description: 'Пользователь неавторизован' })
  @Post()
  create(@Body() data: CreateCommentDto): Promise<Comment> {
    return this.commentsService.create(data);
  }

  @ApiResponse({ status: 200, description: 'Успешная операция', type: Comment })
  @ApiResponse({ status: 401, description: 'Пользователь неавторизован' })
  @Get(':id')
  findOne(@Param('id') id: string): Promise<Comment | null> {
    return this.commentsService.findOne(+id);
  }

  @ApiResponse({ status: 200, description: 'Успешная операция', type: Comment })
  @ApiResponse({ status: 401, description: 'Пользователь неавторизован' })
  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() data: UpdateCommentDto,
  ): Promise<Comment> {
    return this.commentsService.update(+id, data);
  }

  @ApiResponse({ status: 200, description: 'Успешная операция' })
  @ApiResponse({ status: 401, description: 'Пользователь неавторизован' })
  @Delete(':id')
  remove(@Param('id') id: string): Promise<void> {
    return this.commentsService.remove(+id);
  }
}
