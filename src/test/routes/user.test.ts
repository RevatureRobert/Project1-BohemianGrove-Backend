// import { getMockReq, getMockRes } from '@jest-mock/express';
// import { createUser, getUser, authenticate, updateUser, deleteUser} from '../../routes/Users';

// const req = getMockReq({
//   params: {userName:"Triangle", displayName: "The all seeing eye", loginToken: "123456", email: "theOne@gmail.com", password:"hashedPassword"},
  
//   body: { userName:"lady", displayName: "eyeball", loginToken: "56789", email: "grove@gmail.com", password:"hashedPassword123"}
// });

// it('should create a new user with the params', async() => {
//   const {res, next, mockClear } = getMockRes();
//   mockClear();
//   await createUser(req, res);
//   expect(res.status).toHaveBeenCalledWith(200);

//   it('should return an error if there are no params', async() => {
//     const req = getMockReq();
//     const {res, next, mockClear } = getMockRes();
//     mockClear();
//     await createUser(req, res);
//     expect(res.status).toHaveBeenCalledWith(400);
//   })
// })

// it('should get a user with a given userName', async() => {
//   const {res, next, mockClear } = getMockRes();
//   mockClear();
//   await getUser(req, res);
//   expect(res.status).toHaveBeenCalledWith(200);

//   it('should return an error if there are no params', async() => {
//     const req = getMockReq();
//     const {res, next, mockClear } = getMockRes();
//     mockClear();
//     await getUser(req, res);
//     expect(res.status).toHaveBeenCalledWith(400);
//   })
// })

// it('should authenticate the user', async() => {
//   const {res, next, mockClear } = getMockRes();
//   mockClear();
//   await authenticate(req, res);
//   expect(res.status).toHaveBeenCalledWith(200);

//   it('should return an error if the userName and or password is incorrect', async() => {
//     const req = getMockReq({params: {userName: "imWrong", password: "iamnotHashed"}});
//     const {res, next, mockClear } = getMockRes();
//     mockClear();
//     await authenticate(req, res);
//     expect(res.status).toHaveBeenCalledWith(400);
//   })
// })

// it('should update the user', async() => {
//   const {res, next, mockClear } = getMockRes();
//   mockClear();
//   await updateUser(req, res);
//   expect(res.status).toHaveBeenCalledWith(200);

//   it('should return an error if the user or loginToken were not given/incorrect', async() => {
//     const req = getMockReq();
//     const {res, next, mockClear } = getMockRes();
//     mockClear();
//     await updateUser(req, res);
//     expect(res.status).toHaveBeenCalledWith(400);
//   })
// })

// it('should delete the user', async() => {
//   const {res, next, mockClear } = getMockRes();
//   mockClear();
//   await deleteUser(req, res);
//   expect(res.status).toHaveBeenCalledWith(200);

//   it('should return an error if the userName and or password is incorrect', async() => {
//     const req = getMockReq();
//     const {res, next, mockClear } = getMockRes();
//     mockClear();
//     await deleteUser(req, res);
//     expect(res.status).toHaveBeenCalledWith(400);
//   })
// })





