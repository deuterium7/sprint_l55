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
import { TasksService } from './tasks.service';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import { ApiResponse, ApiTags } from '@nestjs/swagger';
import { AuthGuard } from '@nestjs/passport';
import { Task } from './entities/task.entity';

@UseGuards(AuthGuard('jwt'))
@ApiTags('Tasks')
@Controller('tasks')
export class TasksController {
  constructor(private readonly tasksService: TasksService) {}

  @ApiResponse({
    status: 200,
    description: 'Успешная операция',
    type: Task,
    isArray: true,
  })
  @ApiResponse({ status: 401, description: 'Пользователь неавторизован' })
  @Get()
  findAll(): Promise<Task[]> {
    return this.tasksService.findAll();
  }

  @ApiResponse({ status: 201, description: 'Успешная операция', type: Task })
  @ApiResponse({ status: 401, description: 'Пользователь неавторизован' })
  @Post()
  create(@Body() data: CreateTaskDto): Promise<Task> {
    return this.tasksService.create(data);
  }

  @ApiResponse({ status: 200, description: 'Успешная операция', type: Task })
  @ApiResponse({ status: 401, description: 'Пользователь неавторизован' })
  @Get(':id')
  findOne(@Param('id') id: string): Promise<Task | null> {
    return this.tasksService.findOne(+id);
  }

  @ApiResponse({ status: 200, description: 'Успешная операция', type: Task })
  @ApiResponse({ status: 401, description: 'Пользователь неавторизован' })
  @Patch(':id')
  update(@Param('id') id: string, @Body() data: UpdateTaskDto): Promise<Task> {
    return this.tasksService.update(+id, data);
  }

  @ApiResponse({ status: 200, description: 'Успешная операция' })
  @ApiResponse({ status: 401, description: 'Пользователь неавторизован' })
  @Delete(':id')
  remove(@Param('id') id: string): Promise<void> {
    return this.tasksService.remove(+id);
  }
}
