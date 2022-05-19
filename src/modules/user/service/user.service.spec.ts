import { HttpException, HttpStatus } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { DeepPartial, Repository, UpdateResult } from 'typeorm';
import { CreateUserDto } from '../dto/create-user.dto';
import { ResponseUserDto } from '../dto/response-user.dto';
import { UpdateUserDto } from '../dto/update-user.dto';
import { User } from '../entities/user.entity';
import { UserService } from './user.service';

describe('USER SERVICE (unit test)', () => {

  let userService: UserService;
  let userRepository: Repository<User>;
  const USER_REPOSITORY_TOKEN = getRepositoryToken(User)

  // CREATE MOCK USER REPOSITORY
  
  const mockUserRepository = {
    save: jest.fn(),
    find: jest.fn(),
    findOne: jest.fn(),
    update: jest.fn(),
    delete: jest.fn(),
  };


  // START AND CREATE TESTING MODULE 

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [UserService,{
        provide: USER_REPOSITORY_TOKEN,
        useValue: mockUserRepository
      },
    ],
    }).compile();

    userService = module.get<UserService>(UserService);
    userRepository = module.get<Repository<User>>(USER_REPOSITORY_TOKEN);
  });


  // START UNIT TEST USER SERVICE

  describe('Should be defined service and repository', () => {

      it('userService should be defined', () => {
        expect(userService).toBeDefined();
      });

      it('userRepository should be defined', () => {
        expect(userRepository).toBeDefined();
      });
  });


   describe('GET getAll', () => {
      it('Successful response => [users]', async () => {
          let responseRepository : User = {
            id: 1,
            first_name: 'logan',
            last_name: 'wolverin',
            identity_number: 'x',
            phone_number: '00000000',
            password: '123456',
            created_at: new Date(),
            updated_at: new Date(),
          }
            const responseService: ResponseUserDto = {
            id: 1,
            first_name: 'logan',
            last_name: 'wolverin',
            identity_number: 'x',
            phone_number: '00000000',
      }
          jest.spyOn( userRepository,'find').mockImplementation(async ()=>[responseRepository]);

          expect( await userService.getAll()).toEqual([responseService]);       
      });

      it('Failed response => HttpException NOT FOUND', async () => {
        let responseService = new HttpException('No users were found in the database',HttpStatus.NOT_FOUND);    

        jest.spyOn( userRepository,'find').mockImplementation(async ()=> null);

        expect(await responseService.getStatus()).toBe(404);
        expect(await responseService.message).toBe('No users were found in the database');
        expect( await userService.getAll()).toEqual(responseService);       
    });
  });


  describe('GET findById', () => {
      it('Successful response => user', async () => {
        let id = '1';
        let responseRepository : User = {
          id: 1,
          first_name: 'logan',
          last_name: 'wolverin',
          identity_number: 'x',
          phone_number: '00000000',
          password: '123456',
          created_at: new Date(),
          updated_at: new Date(),
        }
        const responseService: ResponseUserDto = {
        id: 1,
        first_name: 'logan',
        last_name: 'wolverin',
        identity_number: 'x',
        phone_number: '00000000',
      }
          jest.spyOn( userRepository,'findOne').mockImplementation(async ()=> responseRepository);

          expect( await userService.findById(id)).toEqual(responseService);       
      });

      it('Failed response => HttpException NOT FOUND', async () => {
        let id = '2';
        let responseService = new HttpException('User not found',HttpStatus.NOT_FOUND);    

        jest.spyOn( userRepository,'findOne').mockImplementation(async ()=> null);

        expect(await responseService.getStatus()).toBe(404);
        expect(await responseService.message).toBe('User not found'); 
        expect( await userService.findById(id)).toEqual(responseService);       
    });

  });


  describe('GET create', () => {
      it('Successful response => user created', async () => {
          let dto : CreateUserDto = {
            id: 1,
            first_name: 'logan',
            last_name: 'wolverin',
            identity_number: 'x',
            phone_number: '00000000',
            password: '123456',
          }

          let data = new User();
          data.first_name = 'logan';
          data.last_name = 'wolverin';
          data.identity_number = 'x';
          data.phone_number = '00000000';
          data.password = '123456';
          data.created_at = new Date();
          data.updated_at = new Date();
          jest.spyOn( userRepository,'save').mockImplementation(async ()=> data);

          expect( await userService.create(dto)).toEqual(data);       
      });
  });


  describe('GET update', () => {
      it('Successful response => HttpException OK', async () => {
        let id = '1';
        let responseService = new HttpException("User with id " + id + " updated",HttpStatus.OK);

        let responseRepository : UpdateResult = {
          affected: 1,
          generatedMaps:[{}],
          raw: '',
        };

        let dataUser = new UpdateUserDto;
        dataUser.phone_number = "111";

          jest.spyOn( userRepository,'update').mockImplementation(async ()=> responseRepository);

          expect(await responseService.getStatus()).toBe(200);
          expect(await responseService.message).toBe('User with id 1 updated'); 
          expect( await userService.update(id,dataUser)).toEqual(responseService);       
      });

      it('Failed response => HttpException NOT FOUND', async () => {
        let id = '2';
        let dataUser = new UpdateUserDto;
        dataUser.phone_number = "111";

        let responseRepository : UpdateResult = {
          affected: 0,
          generatedMaps:[{}],
          raw: '',
        };

        let responseService = new HttpException("User id " + id + " not found in the database",HttpStatus.NOT_FOUND);    

        jest.spyOn( userRepository,'update').mockImplementation(async ()=> responseRepository);

        expect(await responseService.getStatus()).toBe(404);
        expect(await responseService.message).toBe('User id 2 not found in the database'); 
        expect( await userService.update(id,dataUser)).toEqual(responseService);       
    });

  });


  describe('GET remove', () => {
      it('Successful response => HttpException OK', async () => {
        let id = '1';
        let responseService = new HttpException("User with id " + id + " removed successfully",HttpStatus.OK);

        let responseRepository : UpdateResult = {
          affected: 1,
          generatedMaps:[{}],
          raw: '',
        };
     
          jest.spyOn( userRepository,'delete').mockImplementation(async ()=> responseRepository);

          expect(await responseService.getStatus()).toBe(200);
          expect(await responseService.message).toBe('User with id 1 removed successfully'); 
          expect( await userService.remove(id)).toEqual(responseService);       
      });

      it('Failed response => HttpException NOT FOUND', async () => {
        let id = '2';
        let responseRepository : UpdateResult = {
          affected: 0,
          generatedMaps:[{}],
          raw: '',
        };

        let responseService = new HttpException("User id " + id + " not found in the database",HttpStatus.NOT_FOUND);    

        jest.spyOn( userRepository,'delete').mockImplementation(async ()=> responseRepository);

        expect(await responseService.getStatus()).toBe(404);
        expect(await responseService.message).toBe('User id 2 not found in the database'); 
        expect( await userService.remove(id)).toEqual(responseService);       
    });

  });
  
});
