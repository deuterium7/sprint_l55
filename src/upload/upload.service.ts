import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Upload } from './entities/upload.entity';

@Injectable()
export class UploadService {
  constructor(
    @InjectRepository(Upload)
    private repository: Repository<Upload>,
  ) {}

  async uploadMultipleFiles(files): Promise<Upload[]> {
    const result: Upload[] = [];

    for (let file of files) {
      const fileEntity = await this.repository.save({
        filename: file.filename,
        path: file.path,
        original_name: file.originalname,
        mime: file.mimetype,
      });

      result.push(fileEntity);
    }

    return result;
  }
}
