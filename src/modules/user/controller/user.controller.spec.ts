import { Test, TestingModule } from '@nestjs/testing';
import { UserController } from './user.controller';
import { UserService } from '../service/user.service';
import { User } from '../entities/user.entity';
import { CreateUserDto } from '../dto/create-user.dto';
import { ResponseUserDto } from '../dto/response-user.dto';
import { HttpException, HttpStatus } from '@nestjs/common';
import { UpdateUserDto } from '../dto/update-user.dto';

describe('USER CONTROLLER (unit test)', () => {

  
  let userController: UserController;
  let userService: UserService;

 // CREATE MOCK USER SERVICE

  const mockUserService = {
    create: jest.fn(),
    getAll: jest.fn(),
    findById: jest.fn(),
    update: jest.fn(),
    remove: jest.fn(),
  };

 // START AND CREATE TESTING MODULE

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UserController],
      providers: [UserService,],

    }).overrideProvider(UserService)
      .useValue(mockUserService)
      .compile();

    userController = module.get<UserController>(UserController);
    userService = module.get<UserService>(UserService);
  });


  // START UNIT TEST USER CONTROLLER 

  describe('Should be defined controller and service', () => {

      it('UserController should be defined', () => {
        expect(userController).toBeDefined();
      });

      it('UserService should be defined', () => {
        expect(userService).toBeDefined();
      });
  });

  
  describe('@POST /create',()=> {
    it('Successful response => user created', async ()=>{
      const request: CreateUserDto = {
        id: 1, 
        first_name: 'logan',
        last_name: 'wolverin',
        identity_number: 'x',
        phone_number: '00000000',
        password: '123456'
      }
      let data = new User();
        data.first_name = 'logan';
        data.last_name = 'wolverin';
        data.identity_number = 'x';
        data.phone_number = '00000000';
        data.password = '123456';
        data.created_at = new Date();
        data.updated_at = new Date();

      jest.spyOn( userService,'create').mockImplementation(async ()=> data);

      expect(await data.first_name).toBe('logan');
      expect(await userController.create(request)).toEqual(data);
    })

    it('Failed response => HttpException BAD REQUEST', async ()=>{
      let request: CreateUserDto;
      const response = new HttpException('Error',HttpStatus.BAD_REQUEST);

      jest.spyOn( userService,'create').mockImplementation(async ()=>response);

      expect(await response.getStatus()).toBe(400);
      expect(await response.message).toBe('Error');
      expect(await userController.create(request)).toEqual(response);
    })
  });


  describe('@GET /all',()=> {
    it('Successful response => [users]', async ()=>{
      const response: ResponseUserDto = {
        id: 1, 
        first_name: 'logan',
        last_name: 'wolverin',
        identity_number: 'x',
        phone_number: '00000000',
      }
      jest.spyOn( userService,'getAll').mockImplementation(async ()=>[response]);

      expect(await response.first_name).toBe('logan');
      expect(await userController.findAll()).toEqual([response]);
    })

    it('Failed response => HttpException NOT FOUND', async ()=>{
      const response = new HttpException('No users were found in the database',HttpStatus.NOT_FOUND);
      jest.spyOn( userService,'getAll').mockImplementation(async ()=>response);

      expect(await response.getStatus()).toBe(404);
      expect(await response.message).toBe('No users were found in the database');
      expect(await userController.findAll()).toEqual(response);
    })
  });



  describe('@GET /byId/:id',()=> {
    it('Successful response => user', async ()=>{
      const response: ResponseUserDto = {
        id: 1, 
        first_name: 'logan',
        last_name: 'wolverin',
        identity_number: 'x',
        phone_number: '00000000',
      }
      let id = '1';

      jest.spyOn( userService,'findById').mockImplementation(async ()=>response);

      expect(await response.last_name).toBe('wolverin');
      expect(await userController.getById(id)).toEqual(response);
    })

    it('Failed response => HttpException NOT FOUND', async ()=>{
      const response = new HttpException('User not found',HttpStatus.NOT_FOUND);
      let id = '1';

      jest.spyOn( userService,'findById').mockImplementation(async ()=>response);

      expect(await response.getStatus()).toBe(404);
      expect(await response.message).toBe('User not found');
      expect(await userController.getById(id)).toEqual(response);
    })
  });


  describe('@PATCH /update/:id',()=> {
    it('Successful response => HttpException OK', async ()=>{
      let request = new UpdateUserDto;
      request.phone_number = "111";

      let id = "1";
      const response = new HttpException("User with id " + id + " updated",HttpStatus.OK);

      jest.spyOn( userService,'update').mockImplementation(async ()=> response);

      expect(await response.getStatus()).toBe(200);
      expect(await response.message).toBe('User with id 1 updated');
      expect(await userController.update(id,request)).toEqual(response);
    })

    it('Failed response => HttpException BAD REQUEST', async ()=>{
      let request = new UpdateUserDto;
      request.phone_number = "111";

      let id = "2";
      const response = new HttpException("User id " + id + " not found in the database",HttpStatus.BAD_REQUEST);

      jest.spyOn( userService,'update').mockImplementation(async ()=>response);

      expect(await response.getStatus()).toBe(400);
      expect(await response.message).toBe('User id 2 not found in the database');
      expect(await userController.update(id,request)).toEqual(response);
    })
  });


  describe('@DELETE /delete/:id',()=> {
    it('Successful response => HttpException OK', async ()=>{
      let id = "1";
      const response = new HttpException("User with id " + id + " removed successfully",HttpStatus.OK);

      jest.spyOn( userService,'remove').mockImplementation(async ()=> response);

      expect(await response.getStatus()).toBe(200);
      expect(await response.message).toBe('User with id 1 removed successfully');
      expect(await userController.remove(id)).toEqual(response);
    })

    it('Failed response => HttpException NOT FOUND', async ()=>{
      let id = "2";
      const response = new HttpException("User id " + id + " not found in the database",HttpStatus.NOT_FOUND);

      jest.spyOn( userService,'remove').mockImplementation(async ()=>response);

      expect(await response.getStatus()).toBe(404);
      expect(await response.message).toBe('User id 2 not found in the database');
      expect(await userController.remove(id)).toEqual(response);
    })
  });
  
});
