import {Document, Schema, model, Types} from 'mongoose'



interface ICompletedCourseDate {
    courseId: Types.ObjectId;
    date: Date;
}

export interface UserDocument extends Document {
    username: string;
    password?: string,
    email: string;
    name: string;
    role: string[];
    confirmed: boolean;
    code: string;
    completedLectures: Types.ObjectId [];
    completedLessons: Types.ObjectId[];
    completedCourses: Types.ObjectId[];
    completedCoursesDates: ICompletedCourseDate[]
}

const UserSchema = new Schema({
    username: {type: String, required: true},
    password: {type: String, required: true},
    email: {type: String, required: true},
    name: {type: String, required: true},
    role: {type: String, default: ['user']},
    confirmed: {type: Boolean, default: false},
    code: {type: String, required: false},
    completedLectures: [{type: Schema.ObjectId, ref: 'Lecture'}],
    completedLessons: [{type: Schema.ObjectId, ref: 'Lesson'}],
    completedCourses: [{ type: Schema.ObjectId, ref: 'Course' }],
    completedCoursesDates: [{
        courseId: { type: Schema.ObjectId, ref: 'Course' },
        date: { type: Date }
    }],
});

const User = model<UserDocument>('User', UserSchema);

export default User;


