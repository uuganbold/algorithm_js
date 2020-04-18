import User from '../../business/entities/User'
import dao from "../UserDao"

/**
 * Tests UserDao.
 */
describe('UserDao',()=>{
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
            uid:"jasldkfj;asdfj"
        }
        await dao.save(u);
        expect(await dao.findOne(u.uid)).toEqual(u);
    });

    it('cannot be found if login uid is not found',async ()=>{
        expect(await dao.findOne('medku@gm')).toBeNull();
    })

    it('should be found if uid is exists',async ()=>{
        let u:User=await dao.findOne('jasldkfj;asdfj');
        expect(u.username).toEqual('testuser');
    })

    it('should be only one document',async ()=>{
        expect(await dao.count()).toEqual(1);
    })

    it('existing user can be added',async ()=>{
        const u=await dao.findOne('jasldkfj;asdfj');
        u.username='wwerqwre';
        await dao.save(u);
        expect(await dao.findOne(u.uid)).toEqual(u);
    });

    it('existing user can be retrieved by uid',async ()=>{
        const u=await dao.findOne('jasldkfj;asdfj');
        expect(u.username).toEqual('wwerqwre');
    })

    it('not existing user cannot be found',async ()=>{
        const u=await dao.findOne('NotExisting');
        expect(u).toBeNull();
    })

    it('existing user should be exists',async ()=>{
        expect(await dao.exists('jasldkfj;asdfj')).toBeTruthy();
    })

    it('existing user should be found by username',async ()=>{
        expect(await dao.existsUsername('wwerqwre')).toBeTruthy();
    })

    it('not existing user should be not exist',async ()=>{
        expect(await dao.exists('Not_exists')).toBeFalsy();
    })

    it('not existing user should be not found by username ',async ()=>{
        expect(await dao.existsUsername('not_existing_email@luc.edu')).toBeFalsy();
    })

    it('should retrieve only user',async ()=>{
        const users=await dao.findAll();
        expect(users.length).toEqual(1);
    })

    
    it('should retrieve all users',async ()=>{
        await dao.save({username:'test_user1',uid:'test_email1@go.com'});
        await dao.save({username:'test_user2',uid:'test_email2@go.com',bio:'it is bio'});
        await dao.save({username:'test_user3',uid:'test_email3@go.com',photoURL:'https://lh3.googleusercontent.com/proxy/KfaJxQeNRzTDcdv72shStdQq4dbhfrFED_AmBTNbUrNNCs53LqvC93c6dlR8yF2_ifxXDLjdgxmzKpok7097EkFLUVIFdVuAZcX-fgWL6QSL8JPm'});
        await dao.save({username:'test_user4',uid:'test_email4@go.com'});

        const users=await dao.findAll();
        expect(users.length).toEqual(5);
        expect(users.map((u)=>u.username).sort()).toEqual(['wwerqwre','test_user1','test_user2','test_user3','test_user4'].sort());
    })

    it('should retrieve only existing users',async ()=>{
        const uids=['test_email2@go.com','not_existing','test_email4@go.com'];
        const users=await dao.findAllByIDs(uids);
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
        await dao.deleteByID("test_email2@go.com");
        expect(await dao.exists("test_email2@go.com")).toBeFalsy();
        expect(await dao.count()).toEqual(4);
    })

    it('should not be deleted not persisted user',async ()=>{
        const u:User={
            username:'not_persisted',
            uid:'per@dfas',
        }
        await dao.delete(u);
        expect(await dao.count()).toEqual(4);
    })

    it('should be deleted existing user',async ()=>{
        const u:User={username:'test_user4',uid:'test_email4@go.com'};
        await dao.delete(u);
        expect(await dao.exists("test_email4@go.com")).toBeFalsy();
        expect(await dao.count()).toEqual(3);
    })

    

    it('users should be deleted',async ()=>{
        await dao.save({username:'test_user5',uid:'test_email5@go.com'});
        await dao.save({username:'test_user6',uid:'test_email6@go.com'});
        await dao.save({username:'test_user7',uid:'test_email7@go.com',photoURL:'https://lh3.googleusercontent.com/proxy/KfaJxQeNRzTDcdv72shStdQq4dbhfrFED_AmBTNbUrNNCs53LqvC93c6dlR8yF2_ifxXDLjdgxmzKpok7097EkFLUVIFdVuAZcX-fgWL6QSL8JPm'});
        await dao.save({username:'test_user8',uid:'test_email8@go.com',});

        expect(await dao.count()).toEqual(7);
        const users=await dao.findAllByIDs(['test_email3@go.com','test_email7@go.com','test_email1@go.com']);
        users.push({username:'not_exist',uid:'medku@gmail'});
        users.push({username:'not_exists',uid:'medkudf@gmail'});
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