import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true, //엔티티에 있는 값만 가져오기
      forbidNonWhitelisted:  true,//없는 값 입력시 그 값에 대한 에러 메세지
      transform: true, //데이터 변환 가능하게 만듦
    })
  )
  await app.listen(3000);
}
bootstrap();
