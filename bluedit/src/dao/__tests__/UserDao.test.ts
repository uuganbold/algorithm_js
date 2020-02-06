import UserDao from '../UserDao'
import User from '../../business/entities/User'

/**
 * Tests UserDao.
 */
describe('UserDao',()=>{
    const dao=new UserDao();

    it('database can be cleared',async ()=>{
        await dao.deleteAll();
        expect(await dao.count()).toEqual(0);
    })


    it('should be empty when collection is empty',async ()=>{
        let users=await dao.findAll();
        expect(users.length).toEqual(0);
    })

    it('should not be found when collection is empty',async ()=>{
        let users=await dao.findAllByIDs(['testuser','testuser1']);
        expect(users.length).toEqual(0);
    })


    it('new user can be added',async ()=>{
        const u:User={
            username:'testuser',
            email:'testemail@luc.edu',
            password:'test password'
        }
        await dao.save(u);
        expect(await dao.findOne(u.username)).toEqual(u);
    });

    it('cannot be found if email is not found',async ()=>{
        expect(await dao.findByEmail('medku@gm')).toBeNull();
    })

    it('should be found if email is exists',async ()=>{
        let u:User=await dao.findByEmail('testemail@luc.edu');
        expect(u.username).toEqual('testuser');
    })

    it('should be only one document',async ()=>{
        expect(await dao.count()).toEqual(1);
    })

    it('existing user can be added',async ()=>{
        const u=await dao.findOne('testuser');
        u.email='test_new_email@luc.edu';
        await dao.save(u);
        expect(await dao.findOne(u.username)).toEqual(u);
    });

    it('existing user can be retrieved by username',async ()=>{
        const u=await dao.findOne('testuser');
        expect(u.email).toEqual('test_new_email@luc.edu');
    })

    it('not existing user cannot be found',async ()=>{
        const u=await dao.findOne('NotExisting');
        expect(u).toBeNull();
    })

    it('existing user should be exists',async ()=>{
        expect(await dao.exists('testuser')).toBeTruthy();
    })

    it('existing user should be found by email',async ()=>{
        expect(await dao.existsEmail('test_new_email@luc.edu')).toBeTruthy();
    })

    it('not existing user should be not exist',async ()=>{
        expect(await dao.exists('Not_exists')).toBeFalsy();
    })

    it('not existing user should be not found by email ',async ()=>{
        expect(await dao.existsEmail('not_existing_email@luc.edu')).toBeFalsy();
    })

    it('should retrieve only user',async ()=>{
        const users=await dao.findAll();
        expect(users.length).toEqual(1);
    })

    
    it('should retrieve all users',async ()=>{
        await dao.save({username:'test_user1',email:'test_email1@go.com',password:'asfasf'});
        await dao.save({username:'test_user2',email:'test_email2@go.com',password:'adfwe',bio:'it is bio'});
        await dao.save({username:'test_user3',email:'test_email3@go.com',password:'secret',profile_image:'https://lh3.googleusercontent.com/proxy/KfaJxQeNRzTDcdv72shStdQq4dbhfrFED_AmBTNbUrNNCs53LqvC93c6dlR8yF2_ifxXDLjdgxmzKpok7097EkFLUVIFdVuAZcX-fgWL6QSL8JPm'});
        await dao.save({username:'test_user4',email:'test_email4@go.com',password:'newpass'});

        const users=await dao.findAll();
        expect(users.length).toEqual(5);
        expect(users.map((u)=>u.username).sort()).toEqual(['testuser','test_user1','test_user2','test_user3','test_user4'].sort());
    })

    it('should retrieve only existing users',async ()=>{
        const usernames=['test_user2','not_existing','test_user4'];
        const users=await dao.findAllByIDs(usernames);
        expect(users.length).toEqual(2);
        expect(users.map(u=>u.username)).toEqual(['test_user2','test_user4']);
    })

    it('should be empty if ids are empty',async ()=>{
        const usernames:string[]=[];
        const users=await dao.findAllByIDs(usernames);
        expect(users.length).toEqual(0);
    })

    it('should be five',async ()=>{
        expect(await dao.count()).toEqual(5);
    })

    it('should not be deleted not existing user',async ()=>{
        await dao.deleteByID('not_exist');
        expect(await dao.count()).toEqual(5);
    })

    it('should be deleted by id',async ()=>{
        await dao.deleteByID("test_user2");
        expect(await dao.exists("test_user2")).toBeFalsy();
        expect(await dao.count()).toEqual(4);
    })

    it('should not be deleted not persisted user',async ()=>{
        const u:User={
            username:'not_persisted',
            email:'per@dfas',
            password:'asdfadf'
        }
        await dao.delete(u);
        expect(await dao.count()).toEqual(4);
    })

    it('should be deleted existing user',async ()=>{
        const u={username:'test_user4',email:'test_email4@go.com',password:'newpass'};
        await dao.delete(u);
        expect(await dao.exists("test_user4")).toBeFalsy();
        expect(await dao.count()).toEqual(3);
    })

    

    it('users should be deleted',async ()=>{
        await dao.save({username:'test_user5',email:'test_email1@go.com',password:'asfasf'});
        await dao.save({username:'test_user6',email:'test_email2@go.com',password:'adfwe',bio:'it is bio'});
        await dao.save({username:'test_user7',email:'test_email3@go.com',password:'secret',profile_image:'https://lh3.googleusercontent.com/proxy/KfaJxQeNRzTDcdv72shStdQq4dbhfrFED_AmBTNbUrNNCs53LqvC93c6dlR8yF2_ifxXDLjdgxmzKpok7097EkFLUVIFdVuAZcX-fgWL6QSL8JPm'});
        await dao.save({username:'test_user8',email:'test_email4@go.com',password:'newpass'});

        expect(await dao.count()).toEqual(7);
        const users=await dao.findAllByIDs(['test_user3','test_user7','test_user1']);
        users.push({username:'not_exist',email:'medku@gmail',password:'new pass'});
        users.push({username:'not_exists',email:'medkudf@gmail',password:'newsd pass'});
        await dao.deleteObjs(users);
        expect(await dao.count()).toEqual(4);
    })

    it('should not delete empty objs',async ()=>{
        await dao.deleteObjs([]);
        expect(await dao.count()).toEqual(4);
    })

    it('should detele all users',async ()=>{
        await dao.deleteAll();
        expect(await dao.count()).toEqual(0);
    })

    it('should handle empty collection',async ()=>{
        expect(async ()=>{await dao.deleteAll()}).not.toThrow();
    })

})