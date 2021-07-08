/* eslint-disable max-len */
/* eslint-disable @typescript-eslint/unbound-method */
import { getMockReq, getMockRes } from '@jest-mock/express';
import { createUser, getUser, authenticate, updateUser, deleteUser } from '../../routes/Users';
import { ddbDocClient as dynamo } from '../../dynamoDB/dynamoDB';
import { PutCommand } from '@aws-sdk/lib-dynamodb';

const testUserInDB = {
  userName: "NewUser",
  password: "$2b$10$dYwdzHITigXLSpS1/LRBcuSyN7xA7ap1Hwr7IHr/FkAx3nbOEy8by",
  email: "not@real.com",
  profileImg: "http://www.fake.com/img.png",
  displayName: "The Newest User",
  loginToken: "760a950e-9f7d-4e2b-a07a-803b9ef7f4c7"
}

const testUser = {
  userName: "NewUser",
  password: "hashed",
  email: "not@real.com",
  profileImg: "http://www.fake.com/img.png",
  displayName: "The Newest User"
}

beforeEach(async () => {
  await dynamo.send(new PutCommand({
    TableName: "bg-users",
    Item: testUserInDB
  }));
});

afterAll(() => {
  dynamo.destroy();
});

describe('Create user', () => {
  it('should create a new user with the params', async () => {
    const newUser = {
      ...testUser,
      userName: "bob"
    }
    const req = getMockReq({
      body: {
        user: newUser
      }
    });
    const { res, next, mockClear } = getMockRes();
    mockClear();
    await createUser(req, res);
    expect(res.status).toHaveBeenCalledWith(200);
  });

  it('should return an error if there are no params', async () => {
    const req = getMockReq();
    const { res, next, mockClear } = getMockRes();
    mockClear();
    await createUser(req, res);
    expect(res.status).toHaveBeenCalledWith(400);
  });
});



describe('Get user', () => {
  it('should get a user with a given userName', async () => {
    const req = getMockReq({
      params: {
        userName: testUser.userName
      }
    });
    const { res, next, mockClear } = getMockRes();
    mockClear();
    await getUser(req, res);
    expect(res.status).toHaveBeenCalledWith(200);
  });

  it('should return an error if there are no params', async () => {
    const req = getMockReq();
    const { res, next, mockClear } = getMockRes();
    mockClear();
    await getUser(req, res);
    expect(res.status).toHaveBeenCalledWith(400);
  });
});



describe('Authenticate', () => {
  it('should authenticate the user', async () => {
    const req = getMockReq({
      body: {
        userName: testUser.userName,
        password: testUser.password
      }
    });
    const { res, next, mockClear } = getMockRes();
    mockClear();
    await authenticate(req, res);
    expect(res.status).toHaveBeenCalledWith(200);
  });

  it('should return an error if the userName and or password is incorrect', async () => {
    const req = getMockReq({ params: { userName: "imWrong", password: "iamnotHashed" } });
    const { res, next, mockClear } = getMockRes();
    mockClear();
    await authenticate(req, res);
    expect(res.status).toHaveBeenCalledWith(400);
  });
});



describe('Update user', () => {
  it('should update the user', async () => {
    const req = getMockReq({
      body: {
        loginToken: testUserInDB.loginToken,
        user: testUser
      }
    });
    const { res, next, mockClear } = getMockRes();
    mockClear();
    await updateUser(req, res);
    expect(res.status).toHaveBeenCalledWith(200);
  });

  it('should return an error if the user or loginToken were not given/incorrect', async () => {
    const req = getMockReq();
    const { res, next, mockClear } = getMockRes();
    mockClear();
    await updateUser(req, res);
    expect(res.status).toHaveBeenCalledWith(400);
  });
});



describe('Delete user', () => {
  it('should delete the user', async () => {
    const req = getMockReq({
      params: {
        loginToken: testUserInDB.loginToken
      }
    });
    const { res, next, mockClear } = getMockRes();
    mockClear();
    await deleteUser(req, res);
    expect(res.status).toHaveBeenCalledWith(200);
  });

  it('should return an error if the userName and or password is incorrect', async () => {
    const req = getMockReq();
    const { res, next, mockClear } = getMockRes();
    mockClear();
    await deleteUser(req, res);
    expect(res.status).toHaveBeenCalledWith(400);
  });
});
