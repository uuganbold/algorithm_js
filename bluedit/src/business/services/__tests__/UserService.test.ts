import UserService from '../UserService'
import UserDao from '../../../dao/UserDao'
import User from '../../entities/User';
import _ from 'lodash';
import {mocked} from 'ts-jest/utils'

/**
 * To isolate UserService, mocks UserDao.
 */
jest.mock('../../../dao/UserDao');

/**
 * Tests UserService.
 */
describe('UserService',()=>{

    /**
     * Mock object behaving same as UserDao
     */
    const dao=new UserDao();
    const service=new UserService(dao);

    /**
     * Set mock object to it's initial state before each test case.
     */
   beforeEach(()=>{
       jest.resetAllMocks();
   })

    it('create user should create new user',async ()=>{
        const u:User={username:'newname',email:'new_user@yahoo.com',password:'somepassword'}

        const mockCreateUser = jest.fn();
        mocked(dao).save=mockCreateUser;

        mockCreateUser.mockReturnValue(Promise.resolve(_.clone(u)));
     
        const w=await service.createUser(u)
        expect(w).toEqual(u);
        expect(mockCreateUser).toHaveBeenCalledTimes(1);
        expect(mockCreateUser.mock.calls[0][0]).toStrictEqual(u);
    });

    it('should not create user with same username', async ()=>{
        expect.assertions(3)
        //given
        const u:User={username:'newname',email:'another_name@yahoo.com',password:'anotherpassword'}

        const mockExists=jest.fn();
        mockExists.mockReturnValue(Promise.resolve(true));
        mocked(dao).exists=mockExists;


        //when
        try{
            await service.createUser(u);
        }catch(e){
            expect(e.message).toEqual('Username exists. Try another username');
        }
        //then
        expect(mockExists).toHaveBeenCalledTimes(1);
        expect(mockExists.mock.calls[0][0]).toEqual(u.username);

    })

    it('should not create user with same email', async ()=>{
        expect.assertions(3);
        //given
        const u:User={username:'anothername',email:'new_user@yahoo.com',password:'anotherpassword'}
        const mockExistsEmail=jest.fn();
        mockExistsEmail.mockReturnValue(Promise.resolve(true));
        mocked(dao).existsEmail=mockExistsEmail;

        //when
        try{
            await service.createUser(u);
        }catch(e){
            expect(e.message).toEqual('Email exists. Try another email');
        }

        //then
        expect(mockExistsEmail).toHaveBeenCalledTimes(1);
        expect(mockExistsEmail.mock.calls[0][0]).toEqual(u.email);

        
    })

    it('should find user by username', async ()=>{
        //given
        const user={username:'newname',email:'email@mail',password:'secure'};
        const mockFindOne=jest.fn();
        mockFindOne.mockReturnValue(Promise.resolve(user));
        mocked(dao).findOne=mockFindOne;

        //when
        const u=await service.getUser(user.username);

        //then
        expect(u).toEqual(user);
        expect(mockFindOne).toHaveBeenCalledTimes(1);
    })

    it('should not find not existing user', async ()=>{
        //given
        const mockFindOne=jest.fn();
        mockFindOne.mockReturnValue(Promise.resolve(null));
        mocked(dao).findOne=mockFindOne;

        //when-then
        expect(await service.getUser("newnamdfe")).toBeNull();
        expect(mockFindOne).toHaveBeenCalledTimes(1);
    })

    it('should update user if email is not found', async ()=>{
        //given
        const u:User={username:'somename',email:'someemail@gmail.com',password:'secured',bio:'my bio'}
        const result:User=_.assign(_.clone(u),{created:new Date()});
        const mockFindByEmail=jest.fn();
        mockFindByEmail.mockReturnValue(Promise.resolve(null));
        mocked(dao).findByEmail=mockFindByEmail;
        mocked(dao).exists=jest.fn().mockReturnValue(Promise.resolve(true));

        const mockSave=jest.fn();
        mockSave.mockReturnValue(Promise.resolve(result));
        mocked(dao).save=mockSave;

        //when
        const w=await service.updateUser(u);

        //then
        expect(w).toEqual(result);
        expect(mockFindByEmail).toHaveBeenCalledTimes(1);
        expect(mockFindByEmail.mock.calls[0][0]).toEqual(u.email);
        expect(mockSave).toHaveBeenCalledTimes(1);
        expect(mockSave.mock.calls[0][0]).toEqual(u);
    })

    it('should update user if email is found but same user', async ()=>{
        //given
        const u:User={username:'somename',email:'someemail@gmail.com',password:'secured',bio:'my bio'}
        const result:User=_.assign(_.clone(u),{created:new Date()});
        const mockFindByEmail=jest.fn();
        mockFindByEmail.mockReturnValue(Promise.resolve(u));
        mocked(dao).findByEmail=mockFindByEmail;
        mocked(dao).exists=jest.fn().mockReturnValue(Promise.resolve(true));

        const mockSave=jest.fn();
        mockSave.mockReturnValue(Promise.resolve(result));
        mocked(dao).save=mockSave;

        //when
        const w=await service.updateUser(u);

        //then
        expect(w).toEqual(result);
        expect(mockFindByEmail).toHaveBeenCalledTimes(1);
        expect(mockFindByEmail.mock.calls[0][0]).toEqual(u.email);
        expect(mockSave).toHaveBeenCalledTimes(1);
        expect(mockSave.mock.calls[0][0]).toEqual(u);
    })

    it('should not update existing email with other user', async ()=>{
        expect.assertions(4);
        //given
        const user:User={username:'username',email:'anotheremail',password:'somepassdfs'};
        const anotherUser:User={username:'anothername',email:'anotheremail',password:'somepasdfass'};
        const mockFindByEmail=jest.fn();
        mockFindByEmail.mockReturnValue(Promise.resolve(anotherUser));
        mocked(dao).findByEmail=mockFindByEmail;
        
        
        try{
            //when
            await service.updateUser(user);
        }catch(e){
            //then
            expect(e.message).toEqual('Email exists. Try another email');
        }
        expect(mockFindByEmail).toHaveBeenCalledTimes(1);
        expect(mockFindByEmail.mock.calls[0][0]).toEqual(user.email);
        expect(mocked(dao).save).toHaveBeenCalledTimes(0);
    })

    it('should not update not existing user',async ()=>{
        expect.assertions(2);
        //given
        const u:User={username:'notexists',email:'notexits@yahoo.com',password:'pass'}
        mocked(dao).exists=jest.fn().mockReturnValue(Promise.resolve(false));
        //when
        try{
            await service.updateUser(u);
        }catch(e){
            //then
            expect(e.message).toEqual('User not exists');
        }
        expect(mocked(dao).exists).toHaveBeenCalledTimes(1);
    })

    it('should not be empty', async ()=>{
        expect(await service.listUsers()).not.toEqual([]);
    })
})