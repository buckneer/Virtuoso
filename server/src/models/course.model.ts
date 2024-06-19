import {Document, Schema, model, ObjectId, Types} from 'mongoose'
import { LectureDocument } from './lecture.model';

export interface CourseDocument extends Document {
    userId: string,
    title: string,
    description?: string,
    cover?: string,
    length?: string,
    level?: number,
    lectures?: Types.ObjectId[],
    price?: number,
    rating?: number,
}

const CourseSchema = new Schema({
    userId: {type: Schema.ObjectId, ref: 'User', required: true},
    title: {type: String, required: true},
    description: {type: String, required: true},
    cover: {type: String, required: false},
    length: {type: String, required: false, default: 0},
    level: {type: Number, required: false, default: 0},
    lectures: [{type: Schema.ObjectId, ref: 'Lecture'}],
    price: {type: Number, required: false, default: 0},
    rating: {type: Number, required: false, default: 0},
});

const Course = model<CourseDocument>('Course', CourseSchema);

export default Course;


