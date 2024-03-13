import {Document, Schema, model } from 'mongoose'

export interface UserDocument extends Document {
    username: string;
    password?: string,
    email: string;
    name: string;
    role: string[];
    confirmed: boolean;
    code: string;
}

const UserSchema = new Schema({
    username: {type: String, required: true},
    password: {type: String, required: true},
    email: {type: String, required: true},
    name: {type: String, required: true},
    role: {type: Array<string>, default: ['user']},
    confirmed: {type: Boolean, default: false},
    code: {type: String, required: false}
});

const User = model<UserDocument>('User', UserSchema);

export default User;


