import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Comment } from './entities/comment.entity';
import { CreateCommentDto } from './dto/create-comment.dto';
import { UpdateCommentDto } from './dto/update-comment.dto';

@Injectable()
export class CommentsService {
  constructor(
    @InjectRepository(Comment)
    private repository: Repository<Comment>,
  ) {}

  create(data: CreateCommentDto): Promise<Comment> {
    return this.repository.save({ ...data });
  }

  findAll(): Promise<Comment[]> {
    return this.repository.find();
  }

  findOne(id: number): Promise<Comment | null> {
    return this.repository.findOneBy({ id });
  }

  update(id: number, data: UpdateCommentDto): Promise<Comment> {
    return this.repository.save({ ...data, id });
  }

  async remove(id: number): Promise<void> {
    await this.repository.delete(id);
  }
}
