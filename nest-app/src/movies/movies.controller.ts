import { Controller, Delete, Get, Param, Post, Patch, Body, Query } from '@nestjs/common';
import { CreateMovieDto } from './dto/create-movies.dto';
import { UpdateMovieDto } from './dto/update-movies.dto';
import { Movie } from './entities/movies.entity';
import { MoviesService } from './movies.service';

@Controller('movies')
export class MoviesController {
    constructor(private readonly MoviesService: MoviesService){}

    @Get('')
    getAll(){
        return this.MoviesService.getAll()
    }

    @Get('search')
    searchMovie(@Query('year') searchingYear: string){
        return `This will return search after ${searchingYear}`
    } 
    
    @Get(':id')
    getOne(@Param('id') movieId:number) : Movie{
        return this.MoviesService.getOne(movieId)
    }

    @Post('')
    createMovie(@Body() movieData: CreateMovieDto){
        // console.log(movieData)
        // return `This will create a movie with the id : ${id}`
        return this.MoviesService.createMovie(movieData)
    }

    @Delete(':id')
    deleteMovie(@Param('id') movieId: number){
        return this.MoviesService.deleteOne(movieId)
    }
    
    @Patch(':id')
    updateMovie(@Param('id') movieId: number, @Body() updateData: UpdateMovieDto): string{
        // return `This will update a movie with the id : ${id}`
        return this.MoviesService.updateMovie(movieId, updateData)
        // return {
        //     uppdateMoview: movieId,
        //     ...updateData
        // }
    }

}

