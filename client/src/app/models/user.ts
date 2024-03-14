
export interface UserResp {
    access_token?: string,
    refresh_token?: string,
    user?: User
}

export interface User {
    _id?: string;
    username?: string;
    email?: string;
    name?: string;
    role?: Array<string>;
    confirmed?: string;
    
}

export interface UserRegister {
    username?: string;
    email?: string;
    name?: string;
    password?: string;
}