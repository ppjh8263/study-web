import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateMovieDto } from './dto/create-movies.dto';
import { UpdateMovieDto } from './dto/update-movies.dto';
import { Movie } from './entities/movies.entity';

@Injectable()
export class MoviesService {
    private movies: Movie[] = [];
    updatedMovieID = 1;
    
    getAll(): Movie[] {
        return this.movies
    }

    getOne(id:number):Movie{
        let movie = this.movies.find(movie => movie.id === id)
        if(!movie){
            // return 'wrong id'
            throw new NotFoundException(`Movie with ID ${id} not found`)
        }
        return movie
    } 

    deleteOne(id:number): boolean{
        this.getOne(id) //존재여부 확인
        // this.movies = this.movies.filter(movie => movie.id !== id)
        this.movies.forEach( (movie, idx) => {
            if(movie.id === id) this.movies.splice(idx,1);
          });
        return true
    }

    createMovie(movieData: CreateMovieDto){
        this.movies.push({
            // id: this.movies.length + 1,
            id: this.updatedMovieID,
            ...movieData
        });
        this.updatedMovieID += 1;
        // return `created ${movieData.title}`
    }

    updateMovie(id:number, updateData: UpdateMovieDto):string{
        let movie = this.getOne(id);
        this.deleteOne(id);
        this.movies.push({...movie, ...updateData})
        return ''
    }
}

