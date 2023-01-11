import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication, ValidationPipe } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from './../src/app.module';

describe('AppController (e2e)', () => {
  let app: INestApplication;

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    app.useGlobalPipes(
      new ValidationPipe({
        whitelist: true, //엔티티에 있는 값만 가져오기
        forbidNonWhitelisted:  true,//없는 값 입력시 그 값에 대한 에러 메세지
        transform: true, //데이터 변환 가능하게 만듦
      })
    )
    await app.init();
  });

  it('/ (GET)', () => {
    return request(app.getHttpServer())
      .get('/')
      .expect(200)
      .expect('Welcom to my movie API');
  });

  describe('/movies', () => {
    it('GET', () => {
      return request(app.getHttpServer())
        .get('/movies')
        .expect(200)
        .expect([]);
    });
    it('POST 201', () => {
      return request(app.getHttpServer())
        .post('/movies')
        .send({
          title: 'Test',
          year: 2022,
        })
        .expect(201);
    });
    it('POST 400', () => {
      return request(app.getHttpServer())
        .post('/movies')
        .send({
          title: 'Test',
          year: 2022,
          wrong:'wrong'
        })
        .expect(400);
    });
    it('DELETE', () => {
      return request(app.getHttpServer())
        .delete('/movies')
        .expect(404);
    });
  })
  describe('/movies/:id', () => {
    it('GET', () => {
      return request(app.getHttpServer())
      .get('/movies/1')
      .expect(200)
    })
    it('PATCH', () => {
      return request(app.getHttpServer())
      .patch('/movies/1')
      .send({
        title: 'patch',
      })
      .expect(200)
    })
    it('DELETE', () => {
      return request(app.getHttpServer())
      .delete('/movies/1')
      .expect(200)
    })
  })
});
 