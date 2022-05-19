// import { Test, TestingModule } from '@nestjs/testing';
// import { INestApplication } from '@nestjs/common';
// import * as request from 'supertest';
// import { getRepositoryToken, TypeOrmModule } from '@nestjs/typeorm';
// import { User } from './../src/modules/user/entities/user.entity';
// import { UserModule } from './../src/modules/user/user.module';
// import { UserController } from './../src/modules/user/controller/user.controller';
// import { UserService } from './../src/modules/user/service/user.service';
// import { AppModule } from './../src/app.module';
// import { CreateUserDto } from './../src/modules/user/dto/create-user.dto';
// import { ConfigModule } from '@nestjs/config';
// import { DatabaseConfig } from './../src/config/db.config';
// import config from './../src/config/config';



// describe('UserController (e2e)', () => {
//   let app: INestApplication;
//   const USER_REPOSITORY_TOKEN = getRepositoryToken(User);

//   let mockCreateUser: CreateUserDto 

//   let data = new User();
//   data.first_name = 'tony';
//   data.last_name = 'montana';
//   data.identity_number = '33564789';
//   data.phone_number = '1108826589';
//   data.password = '1133';
// //   data.created_at = new Date();
// //   data.updated_at = new Date();

//   mockCreateUser = data;

//    let arrayUsers: User[];
//       arrayUsers = [data,data];

// //   const mockUserService = {

// //     create: jest.fn().mockImplementation((createUserDto: CreateUserDto) => {
// //       return mockUserRepository.save(createUserDto);
// //     }),

// //     findAll: jest.fn().mockImplementation(() => {
// //       const response = mockUserRepository.find();
// //       return response;
// //     }),

// //     findOne: jest.fn().mockImplementation((id: number) => {
// //       const response = mockUserRepository.findOne(id);
// //       return response;
// //     })
// //   };

//   const mockUserRepository = {

//     find: jest.fn().mockImplementation(() => {
//         console.log("ENTRO");
//       return arrayUsers;
//     }),

//     save: jest.fn().mockImplementation((user) => {
//       return user
//     }),

//     findOne: jest.fn().mockImplementation((id) => {
//       return mockCreateUser;
//     }),

//     update: jest.fn(),

//     delete: jest.fn(),
//   }


//   beforeEach(async () => {
//     const moduleFixture: TestingModule = await Test.createTestingModule({
//       imports: [UserModule,AppModule
//                 //AppModule, 
//                 // ConfigModule.forRoot({
//                 //     isGlobal: true,
//                 //     load: [config],
//                 //     envFilePath: ['.env'],
//                 //   }),
//                 // TypeOrmModule.forRoot({
//                 //     type: 'mysql',
//                 //     host: 'localhost',
//                 //     port: 2000,
//                 //     username: 'root',
//                 //     password: 'skateboard3',
//                 //     database: 'prueba',
//                 //     entities: ['./**/*.entity.ts'],
//                 //     synchronize: true,
//                 // }),
//             ],
//       controllers: [UserController],
//       providers: [UserService,
//         // {

//         //             provide: USER_REPOSITORY_TOKEN,
//         //             useValue: mockUserRepository
//         //         }
//             ],
//     }).overrideProvider(USER_REPOSITORY_TOKEN).useValue(mockUserRepository).compile();

//     app = moduleFixture.createNestApplication();
//     await app.init();
//   });

//   it('GET ALL', async () => {
//     return request(app.getHttpServer())
//       .get('/all')
//       .expect(200)
//       .expect(arrayUsers);
//   });

// //   it('GET BY ID', async () => {
// //     return request(app.getHttpServer())
// //       .get('/byId/2')
// //       .expect(200)
// //       .expect(mockCreateUser)
// //   });

//   afterAll(async () => {
//     await app.close();
//   });

// });