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
    length: {type: String, required: false},
    level: {type: Number, required: false},
    lectures: [{type: Schema.ObjectId, ref: 'Lecture'}],
    price: {type: Number, required: false},
    rating: {type: Number, required: false},
});

const Course = model<CourseDocument>('Course', CourseSchema);

export default Course;


