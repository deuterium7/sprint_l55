import { Injectable } from '@nestjs/common';
import { InjectQueue } from '@nestjs/bull';
import { Queue } from 'bull';

@Injectable()
export class ModerationService {
  constructor(@InjectQueue('moderation') private moderationQueue: Queue) {}

  async moderate(comment_id: Number) {
    this.moderationQueue.add('moderate', { comment_id });
  }

  async getJobs() {
    return await this.moderationQueue.getJobs(['active', 'completed']);
  }
}
