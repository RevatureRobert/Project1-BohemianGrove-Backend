export interface IUser {
    userName: string;
    displayName: string;
    loginToken?: string;
    email?: string;
    password?: string;
    profileImg: string;
}

export class User implements IUser {

    public userName: string;
    public displayName: string;
    public loginToken?: string;
    public email?: string;
    public password?: string;
    public profileImg: string;

    // eslint-disable-next-line max-len
    constructor(userNameOrObject: string | any, displayName?: string, profileImg?: string, email?: string, loginToken?: string) {
        if (typeof userNameOrObject == 'string') {
            this.userName = userNameOrObject;
            this.displayName = displayName || '';
            this.profileImg = profileImg || '';
            if (email) this.email = email;
            if (loginToken) this.loginToken = loginToken;
        } else {
            this.userName = userNameOrObject.userName;
            this.displayName = userNameOrObject.displayName;
            this.profileImg = userNameOrObject.profileImg;
            if (userNameOrObject.email) this.email = userNameOrObject.email;
            if (userNameOrObject.loginToken) this.loginToken = userNameOrObject.loginToken;
        }
    }

    public cleansed(): User {
        return new User(this.userName, this.displayName, this.profileImg);
    }
}

export default User;
