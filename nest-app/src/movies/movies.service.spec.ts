import { NotFoundException } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import exp from 'constants';
import { Movie } from './entities/movies.entity';
import { MoviesService } from './movies.service';

describe('MoviesService', () => {
  let service: MoviesService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [MoviesService],
    }).compile();

    service = module.get<MoviesService>(MoviesService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe("getAll", () => {
    it("shold return an array", () => {
      let result = service.getAll()
      expect(result).toBeInstanceOf(Array);
    })
  })
  
  describe("createMovie", () => {
    it("shold be create a movie", () => {
      let beforeCreate = service.getAll().length
      service.createMovie({
        title: 'test movie',
        genres: ['test1','test2'],
        year: 2015,
      })
      let afterCreate = service.getAll().length
      expect(afterCreate).toBeGreaterThan(beforeCreate)
    })
  })
  
  describe("getOne", () => {
    it("shold return Movie", () => {
      service.createMovie({
        title: 'test movie',
        genres: ['test1','test2'],
        year: 2015,
      })
      let movie = service.getOne(1)
      expect(movie).toBeDefined();
      expect(movie.id).toEqual(1);
    })
    it("should throw 404 error", () =>{
      try{
        service.getOne(999)
      }catch(e){
        expect(e).toBeInstanceOf(NotFoundException)
        expect(e.message).toEqual('Movie with ID 999 not found')
      }
    })
  })
  describe("deleteOne", ()=>{
    it("deletes a movie", () => {
      service.createMovie({
        title: 'Test movie for Delete',
        genres: ['test1','test2'],
        year: 2022,
      })
      let beforeDelete = service.getAll().length
      let result = service.deleteOne(1)
      expect(result).toEqual(true)
      let afterDelete = service.getAll().length
      expect(afterDelete).toEqual(beforeDelete-1)
    })
    it("should throw 404 error", () => {
      try{
        service.deleteOne(999)
      }catch(e){
        expect(e).toBeInstanceOf(NotFoundException)
        expect(e.message).toEqual('Movie with ID 999 not found')
      }
    })
  })
  describe("updateMovie", ()=>{
    it("it should be update a movie", () => {
      service.createMovie({
        title: 'Test movie',
        genres: ['test1','test2'],
        year: 2022,
      })
      let beforeUpdate = service.getOne(1).title
      service.updateMovie(1, {title:'test for update'})
      let afterUpdate = service.getOne(1).title
      expect(beforeUpdate).toEqual('Test movie')
      expect(afterUpdate).toEqual('test for update')
    })
  })
});
