import { Module } from '@nestjs/common';
import { MoviesController } from './movies.controller';
import { MoviesService } from './movies.service';

@Module({
    imports: [],
    controllers: [MoviesController], //url을 가져와 함수 실행
    providers: [MoviesService], //
})
export class MoviesModule {}
