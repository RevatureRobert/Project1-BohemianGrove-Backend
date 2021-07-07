import { GetCommand, PutCommand } from "@aws-sdk/lib-dynamodb";
import UserDao from "../../daos/User/UserDao";
import {ddbDocClient as dynamo} from '../../dynamoDB/dynamoDB';

const userDao = new UserDao();

const testUser = {
    userName: "NewUser",
    password: "hashed",
    email: "not@real.com",
    profileImg: "http://www.fake.com/img.png",
    displayName: "The Newest User"
}

const testUserInDB = {
    userName: "NewUser",
    password: "$2b$10$dYwdzHITigXLSpS1/LRBcuSyN7xA7ap1Hwr7IHr/FkAx3nbOEy8by",
    email: "not@real.com",
    profileImg: "http://www.fake.com/img.png",
    displayName: "The Newest User",
    loginToken: "760a950e-9f7d-4e2b-a07a-803b9ef7f4c7"
}

afterAll(() => {
    dynamo.destroy();
});



test("Create user", async () => {
    // Setup test
    const userToAdd = {
        userName: "albert123",
        password: "password",
        email: "albert@fake.com",
        profileImg: "http://www.fake-img.com/fake.png",
        displayName: "Best Albert"
    }
    
    // Run the dao
    const result = await userDao.createUser(userToAdd);

    // Check the result
    expect(result.success).toBe(true);
    expect(result.data).toBeTruthy();
    expect(result.data.loginToken).toBeTruthy();
    expect(result.data.password).toBeUndefined();

    // Get from the database
    const checkParams = {
        TableName: "bg-users",
        Key: {
            userName: "albert123"
        }
    }
    const fromDB = await dynamo.send(new GetCommand(checkParams));

    // Check the database
    expect(fromDB.Item).toBeTruthy();
    if (fromDB.Item) {
        expect(fromDB.Item.userName).toEqual("albert123");
        expect(fromDB.Item.password == "password").toBe(false);
        expect(fromDB.Item.loginToken).toBeTruthy();
    }    
});



test('Get user', async () => {
    // Setup test
    await dynamo.send(new PutCommand({
        TableName: "bg-users",
        Item: testUserInDB
    }));

    // Run the dao
    const result = await userDao.getUser("NewUser");

    // Check the result
    expect(result.success).toBeTruthy();
    expect(result.data).toBeTruthy();
    expect(result.data.password).toBeUndefined();
    expect(result.data.loginToken).toBeUndefined();
    expect(result.data.userName).toEqual("NewUser");
});



test('Update user', async () => {
    // Setup test
    await dynamo.send(new PutCommand({
        TableName: "bg-users",
        Item: testUserInDB
    }));
    const userToUpdate = {
        ...testUser,
        profileImg: "different",
        email: "also different",
        displayName: "The Most Different"
    }

    // Run the dao
    const result = await userDao.updateUser(testUserInDB.loginToken, userToUpdate);

    // Check the result
    expect(result.success).toBeTruthy();
    expect(result.data).toBeTruthy();
    expect(result.data.profileImg).toEqual(userToUpdate.profileImg);
    expect(result.data.email).toEqual(userToUpdate.email);
    expect(result.data.displayName).toEqual(userToUpdate.displayName);

    // Get from the database
    const fromDB = await dynamo.send(new GetCommand({
        TableName: "bg-users",
        Key: {
            userName: testUser.userName
        }
    }));

    // Check the database
    expect(fromDB.Item).toBeTruthy();
    if (fromDB.Item){
        expect(fromDB.Item.userName).toEqual(testUser.userName);
        expect(fromDB.Item.profileImg).toEqual(userToUpdate.profileImg);
        expect(fromDB.Item.email).toEqual(userToUpdate.email);
        expect(fromDB.Item.displayName).toEqual(userToUpdate.displayName);
    }
    
});



test('Delete user', async () => {
    // Setup test
    await dynamo.send(new PutCommand({
        TableName: "bg-users",
        Item: testUserInDB
    }));

    // Run the dao
    const result = await userDao.deleteUser(testUserInDB.loginToken);

    // Check the result
    expect(result.success).toBeTruthy();
    expect(result.data).toBeUndefined();
    expect(result.message).toBeTruthy();

    // Get from the database
    const fromDB = await dynamo.send(new GetCommand({
        TableName: "bg-users",
        Key: {
            userName: testUser.userName
        }
    }));

    // Check the database
    expect(fromDB.Item).toBeUndefined();
});



test('Authenticate user', async () => {
    // Setup test
    await dynamo.send(new PutCommand({
        TableName: "bg-users",
        Item: testUserInDB
    }));

    // Run the dao
    const result = await userDao.authenticate(testUser.userName, testUser.password);

    // Check the result
    const userToCheckAgainst = {
        ...testUserInDB,
        password: undefined
    }
    expect(result.success).toBeTruthy();
    expect(result.data).toBeTruthy();
    expect(result.data).toEqual(userToCheckAgainst);
});