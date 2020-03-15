import {UserService} from '../UserService'
import {UserDao} from '../../../dao/UserDao'
import firebase from '../../../firebase/admin';
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
    const dao=new UserDao(firebase.firestore());
    const service=new UserService(dao);

    /**
     * Set mock object to it's initial state before each test case.
     */
   beforeEach(()=>{
       jest.resetAllMocks();
   })

    it('create user should create new user',async ()=>{
        const u:User={username:'newname',uid:'new_user@yahoo.com'}

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
        const u:User={username:'newname',uid:'another_name@yahoo.com'}

        const mockExists=jest.fn();
        mockExists.mockReturnValue(Promise.resolve(true));
        mocked(dao).existsUsername=mockExists;


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

    it('should not create user with same login uid', async ()=>{
        expect.assertions(3);
        //given
        const u:User={username:'anothername',uid:'new_user@yahoo.com'}
        const mockExistsUID=jest.fn();
        mockExistsUID.mockReturnValue(Promise.resolve(true));
        mocked(dao).exists=mockExistsUID;

        //when
        try{
            await service.createUser(u);
        }catch(e){
            expect(e.message).toEqual('Login UID exists. You cannot create another profile.');
        }

        //then
        expect(mockExistsUID).toHaveBeenCalledTimes(1);
        expect(mockExistsUID.mock.calls[0][0]).toEqual(u.uid);

        
    })

    it('should find user by username', async ()=>{
        //given
        const user:User={username:'newname',uid:'email@mail'};
        const mockFindOne=jest.fn();
        mockFindOne.mockReturnValue(Promise.resolve(user));
        mocked(dao).findOne=mockFindOne;

        //when
        const u=await service.getUser(user.uid);

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

    it('should update user if username is not found', async ()=>{
        //given
        const u:User={username:'somename',uid:'someemail@gmail.com',bio:'my bio'}
        const result:User=_.assign(_.clone(u),{created:new Date()});
        const mockFindByUsername=jest.fn();
        mockFindByUsername.mockReturnValue(Promise.resolve(null));
        mocked(dao).findByUserName=mockFindByUsername;
        mocked(dao).exists=jest.fn().mockReturnValue(Promise.resolve(true));

        const mockSave=jest.fn();
        mockSave.mockReturnValue(Promise.resolve(result));
        mocked(dao).save=mockSave;

        //when
        const w=await service.updateUser(u);

        //then
        expect(w).toEqual(result);
        expect(mockFindByUsername).toHaveBeenCalledTimes(1);
        expect(mockFindByUsername.mock.calls[0][0]).toEqual(u.username);
        expect(mockSave).toHaveBeenCalledTimes(1);
        expect(mockSave.mock.calls[0][0]).toEqual(u);
    })

    it('should update user if username is found but same user', async ()=>{
        //given
        const u:User={username:'somename',uid:'someemail@gmail.com',bio:'my bio'}
        const result:User=_.assign(_.clone(u),{created:new Date()});
        const mockFindByUsername=jest.fn();
        mockFindByUsername.mockReturnValue(Promise.resolve(u));
        mocked(dao).findByUserName=mockFindByUsername;
        mocked(dao).exists=jest.fn().mockReturnValue(Promise.resolve(true));

        const mockSave=jest.fn();
        mockSave.mockReturnValue(Promise.resolve(result));
        mocked(dao).save=mockSave;

        //when
        const w=await service.updateUser(u);

        //then
        expect(w).toEqual(result);
        expect(mockFindByUsername).toHaveBeenCalledTimes(1);
        expect(mockFindByUsername.mock.calls[0][0]).toEqual(u.username);
        expect(mockSave).toHaveBeenCalledTimes(1);
        expect(mockSave.mock.calls[0][0]).toEqual(u);
    })

    it('should not update existing username with other user', async ()=>{
        expect.assertions(4);
        //given
        const user:User={username:'username',uid:'email'};
        const anotherUser:User={username:'username',uid:'anotheremail'};
        const mockFindByUsername=jest.fn();
        mockFindByUsername.mockReturnValue(Promise.resolve(anotherUser));
        mocked(dao).findByUserName=mockFindByUsername;
        
        
        try{
            //when
            await service.updateUser(user);
        }catch(e){
            //then
            expect(e.message).toEqual('This username belongs to another user. Please choose another one.');
        }
        expect(mockFindByUsername).toHaveBeenCalledTimes(1);
        expect(mockFindByUsername.mock.calls[0][0]).toEqual(user.username);
        expect(mocked(dao).save).toHaveBeenCalledTimes(0);
    })

    it('should not update not existing user',async ()=>{
        expect.assertions(2);
        //given
        const u:User={username:'notexists',uid:'notexits@yahoo.com'}
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