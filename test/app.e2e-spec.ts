import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from './../src/app.module';

describe('AppController (e2e)', () => {
  let app: INestApplication;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  it('/ (GET)', () => {
    return request(app.getHttpServer())
      .get('/')
      .expect(200)
      .expect('Hello World!');
  });

  it('/comments (POST)', () => {
    return request(app.getHttpServer())
      .post('/comments')
      .set('Authorization', 'Bearer JwtFailToken')
      .expect(401);
  });

  it('/comments (POST)', () => {
    return request(app.getHttpServer())
      .post('/comments')
      .set('Authorization', `Bearer ${process.env.JWT_TEST_TOKEN}`)
      .send({ message: 'Test message' })
      .expect(201)
      .expect(res => {
        expect(res.body).toEqual(
          expect.objectContaining({
            id: expect.any(Number),
            message: expect.any(String),
            created_at: expect.any(String),
          })
        );
      });
  });

  it('/comments (GET)', () => {
    return request(app.getHttpServer())
      .get('/comments')
      .set('Authorization', 'Bearer JwtFailToken')
      .expect(401);
  });

  it('/comments (GET)', () => {
    return request(app.getHttpServer())
      .get('/comments')
      .set('Authorization', `Bearer ${process.env.JWT_TEST_TOKEN}`)
      .expect(200)
      .expect(res => {
        expect(res.body).toEqual(
          expect.arrayContaining([
            expect.objectContaining({
              id: expect.any(Number),
              message: expect.any(String),
              created_at: expect.any(String),
              task: expect.any(Object),
              user: expect.any(Object),
            })
          ]),
        );
      });
  });

  it('/comments/1 (GET)', () => {
    return request(app.getHttpServer())
      .get('/comments/1')
      .set('Authorization', 'Bearer JwtFailToken')
      .expect(401);
  });

  it('/comments/1 (GET)', () => {
    return request(app.getHttpServer())
      .get('/comments/1')
      .set('Authorization', `Bearer ${process.env.JWT_TEST_TOKEN}`)
      .expect(200)
      .expect(res => {
        expect(res.body).toEqual(
          expect.objectContaining({
            id: expect.any(Number),
            message: expect.any(String),
            created_at: expect.any(String),
            task: expect.any(Object),
            user: expect.any(Object),
          })
        );
      });
  });

  it('/tasks (POST)', () => {
    return request(app.getHttpServer())
      .post('/tasks')
      .set('Authorization', 'Bearer JwtFailToken')
      .expect(401);
  });

  it('/tasks (POST)', () => {
    return request(app.getHttpServer())
      .post('/tasks')
      .set('Authorization', `Bearer ${process.env.JWT_TEST_TOKEN}`)
      .send({ title: 'Test title', description: 'Test Description' })
      .expect(201)
      .expect(res => {
        expect(res.body).toEqual(
          expect.objectContaining({
            id: expect.any(Number),
            title: expect.any(String),
            description: expect.any(String),
            status: expect.any(String),
            created_at: expect.any(String),
            updated_at: expect.any(String),
          })
        );
      });
  });

  it('/tasks (GET)', () => {
    return request(app.getHttpServer())
      .get('/tasks')
      .set('Authorization', 'Bearer JwtFailToken')
      .expect(401);
  });

  it('/tasks (GET)', () => {
    return request(app.getHttpServer())
      .get('/tasks')
      .set('Authorization', `Bearer ${process.env.JWT_TEST_TOKEN}`)
      .expect(200)
      .expect(res => {
        expect(res.body).toEqual(
          expect.arrayContaining([
            expect.objectContaining({
              id: expect.any(Number),
              title: expect.any(String),
              description: expect.any(String),
              status: expect.any(String),
              created_at: expect.any(String),
              updated_at: expect.any(String),
            })
          ]),
        );
      });
  });

  it('/tasks/1 (GET)', () => {
    return request(app.getHttpServer())
      .get('/tasks/1')
      .set('Authorization', 'Bearer JwtFailToken')
      .expect(401);
  });

  it('/tasks/1 (GET)', () => {
    return request(app.getHttpServer())
      .get('/tasks/1')
      .set('Authorization', `Bearer ${process.env.JWT_TEST_TOKEN}`)
      .expect(200)
      .expect(res => {
        expect(res.body).toEqual(
          expect.objectContaining({
            id: expect.any(Number),
            title: expect.any(String),
            description: expect.any(String),
            status: expect.any(String),
            created_at: expect.any(String),
            updated_at: expect.any(String),
          })
        );
      });
  });
});