import {Document, Schema, model, ObjectId } from 'mongoose'
import { LectureDocument } from './lecture.model';

export interface CourseDocument extends Document {
    userId: string,
    title: string,
    description?: string,
    cover?: string,
    length?: string,
    level?: number,
    lectures?: LectureDocument[],
    price?: number,
    rating?: number,
    enrolls?: number,
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
    enrolls: {type: Number, required: false}
});

const Course = model<CourseDocument>('Course', CourseSchema);

export default Course;

