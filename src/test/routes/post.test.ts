import { getMockReq, getMockRes } from '@jest-mock/express'
import {getGlobalFeed, createPost, getUserFeed, deletePost} from '../../routes/post';

const req = getMockReq({
  body: {
    post:{
      userName: "King Kong", 
      postTime: Date.now(), 
      displayName: "KongMan", 
      displayImg: "kingKongOntopOfBuild.png", 
      postBody: "Where is Jane? I want to go home!", 
      postImg: "skullIsland.png"
    }
  },
  params: {
    userName: "King Kong"
  }
});

describe('globalFeed Route', () => {
  it('should get all post for the global feed', async() => {
    const {res, next, mockClear } = getMockRes();
    mockClear();
    await getGlobalFeed(req, res);
    expect(res.status).toHaveBeenCalledWith(200);
  })
})

describe('createPost Route', ()=> {
  it('should create new post with inputs', async() => {
    const {res, next, mockClear } = getMockRes();
    mockClear();
    await createPost(req, res);
    expect(res.status).toHaveBeenCalledWith(201);
  });

  it('should return an error if params are not provided', async() => {
    const req = getMockReq();
    const {res, next, mockClear } = getMockRes();
    mockClear();
    await createPost(req, res);
    expect(res.status).toHaveBeenCalledWith(500);
  })
})

describe('userFeed Route', () => {
  it('should get all post with the userName', async() => {
    const {res, next, mockClear } = getMockRes();
    mockClear();
    await getUserFeed(req, res);
    expect(res.status).toHaveBeenCalledWith(200);
  })

  it('should return an error if userName doesnt exist or is not provided', async() => {
    const req2 = getMockReq();
    const {res, next, mockClear } = getMockRes();
    mockClear();
    await getUserFeed(req2, res);
    expect(res.status).toHaveBeenCalledWith(500);
  })
})

describe('deletePost Route', () => {
  it('should delete the specific post', async() => {
    const {res, next, mockClear } = getMockRes();
    mockClear();
    await deletePost(req, res);
    expect(res.status).toHaveBeenCalledWith(200);
  })

  it('should return an error if there is no provided post', async() => {
    const req = getMockReq();
    const {res, next, mockClear } = getMockRes();
    mockClear();
    await deletePost(req, res);
    expect(res.status).toHaveBeenCalledWith(500);
  })
})
