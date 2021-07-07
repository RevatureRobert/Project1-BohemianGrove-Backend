// import { getMockReq, getMockRes } from '@jest-mock/express'
// import {getGlobalFeed, createPost, getUserFeed, deletePost} from '../../routes/post';

// const req = getMockReq({
//   body: {userName: "King Kong", postTime: "11:30", displayName: "KongMan", displayImg: "kingKongOntopOfBuild.png", postBody: "Where is Jane? I want to go home!", postImg: "skullIsland.png"},

//   params: {userName: "King Kong"}
// });

// test('startTest', () => {
//   expect(([1,2,3])).not.toEqual([1,2,"3"]);
// })

// it('should get all post for the global feed', async() => {
//   const {res, next, mockClear } = getMockRes();
//   mockClear();
//   await getGlobalFeed(req, res);
//   expect(res.status).toHaveBeenCalledWith(200);
// })

// it('should create new post with inputs', async() => {
//   const {res, next, mockClear } = getMockRes();
//   mockClear();
//   await createPost(req, res);
//   expect(res.status).toHaveBeenCalledWith(200);

//   it('should return an error if there are no params', async() => {
//     const req = getMockReq();
//     const {res, next, mockClear } = getMockRes();
//     mockClear();
//     await createPost(req, res);
//     expect(res.status).toHaveBeenCalledWith(400);
//   })
// })

// it('should get all post with the userName', async() => {
//   const {res, next, mockClear } = getMockRes();
//   mockClear();
//   await getUserFeed(req, res);
//   expect(res.status).toHaveBeenCalledWith(200);

//   it('should return an error if there is no userName', async() => {
//     const req = getMockReq();
//     const {res, next, mockClear } = getMockRes();
//     mockClear();
//     await getUserFeed(req, res);
//     expect(res.status).toHaveBeenCalledWith(400);
//   })
// })

// it('should delete the specific post', async() => {
//   const {res, next, mockClear } = getMockRes();
//   mockClear();
//   await deletePost(req, res);
//   expect(res.status).toHaveBeenCalledWith(200);

//   it('should return an error if there is no given post to delete', async() => {
//     const req = getMockReq();
//     const {res, next, mockClear } = getMockRes();
//     mockClear();
//     await deletePost(req, res);
//     expect(res.status).toHaveBeenCalledWith(400);
//   })
// })




