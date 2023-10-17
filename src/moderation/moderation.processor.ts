import { Process, Processor } from '@nestjs/bull';
import { Job } from 'bull';

@Processor('moderation')
export class ModerationProcessor {
  @Process('moderate')
  async moderate(job: Job) {
    const start = Date.now();
    console.log(`Moderate start`);

    // Имитируем выполнение чего-то тяжелого
    for (let i = 0; i <= 100; i++) {
      console.log(`Progress: ${i}%`);
      await job.progress(i);

      for (let j = 0; j <= 100000; j++) {
        for (let k = 0; k < 5000; k++) {
          j + i;
        }
      }
    }

    console.log(`Moderate end. Times: (${Date.now() - start} ms)`);
    return {};
  }
}
