import { Test, TestingModule } from '@nestjs/testing';
import * as request from 'supertest';
import { User } from '../src/modules/user/entities/user.entity';
import { CreateUserDto } from '../src/modules/user/dto/create-user.dto';
import { TestModule } from '../src/test.module';
import { INestApplication } from '@nestjs/common';
import { UpdateUserDto } from '../src/modules/user/dto/update-user.dto';

describe('UserController (e2e)', () => { 

  let app: INestApplication;
     

  beforeAll(async () => { 
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [TestModule]
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });



  describe('USER CONTROLLER',()=>{

    describe('@GET(/all)',()=>{
      it('(getAll => Successful response)', () => { 
        
          return request(app.getHttpServer()) 
            .get('/all') 
            .expect(200) 
            .expect([
              {
                id: 1,
                first_name: 'carlitos',
                last_name: 'peres',
                identity_number: '26333569',
                phone_number: '1165689541',
              
              }
            ]) 
      })
    });

    describe('@GET(/byId/:id)',()=>{
        it('(getById => Successful response)', () => { 
          return request(app.getHttpServer()) 
            .get('/byId/1') 
            .expect(200) 
            .expect({

              id: 1,
              first_name: 'carlitos',
              last_name: 'peres',
              identity_number: '26333569',
              phone_number: '1165689541',
             
            })
        })
    });
    
    describe('@GET(/byId/:id)',()=>{
        it('(getById => Failed response)', () => { 
          return request(app.getHttpServer()) 
            .get('/byId/11') 
            .expect(200) 
            .expect({"response":"User not found","status":404,"message":"User not found","name":"HttpException"}); 
        })
    });

    describe('@POST(/create)',()=>{
        it('(create Successful response)', () => { 

          let data: CreateUserDto ;
          let user = new User;
          user.id = 10;
          user.first_name = "pepe";
          user.last_name = "argento";
          user.identity_number = "1234";
          user.phone_number = "123456";
          user.password = "321654";
          data = user;  
          

          return request(app.getHttpServer()) 
            .post('/create') 
            .send(data)
            .expect(201) 
            
        })
    });

    describe('@PATCH(/update/:id)',()=>{
        it('(update => Successful response)', () => { 

          let data = new UpdateUserDto;
          data.first_name = "pepito";
          
          return request(app.getHttpServer()) 
            .patch('/update/10')
            .send(data) 
            .expect(200) 
            .expect({"response":"User with id 10 updated","status":200,"message":"User with id 10 updated","name":"HttpException"}); 
        })
    });

    describe('@PATCH(/update/:id)',()=>{
        it('(update => Failed response)', () => { 

          let data = new UpdateUserDto;
          data.first_name = "pepito";
          
          return request(app.getHttpServer()) 
            .patch('/update/100')
            .send(data) 
            .expect(200) 
            .expect({"response":"User id 100 not found in the database","status":404,"message":"User id 100 not found in the database","name":"HttpException"}); 
        })
    });

    describe('@DELETE(/delete/:id)',()=>{
        it('(remove => Successful response)', () => { 
          return request(app.getHttpServer()) 
            .delete('/delete/10') 
            .expect(200) 
            .expect({"response":"User with id 10 removed successfully","status":200,"message":"User with id 10 removed successfully","name":"HttpException"}); 
        });
      });

      describe('@DELETE(/delete/:id)',()=>{
        it('(remove => Failed response)', () => { 
          return request(app.getHttpServer()) 
            .delete('/delete/30') 
            .expect(200) 
            .expect({"response":"User id 30 not found in the database","status":404,"message":"User id 30 not found in the database","name":"HttpException"}); 
        });
      });

  });
  
  afterAll(async () => {
      await app.close();
    });

});