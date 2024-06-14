import {Document, Schema, model, Types} from "mongoose";
import { LessonDocument } from "./lesson.model";

export interface LectureDocument extends Document {
    courseId: Types.ObjectId,
    name: string,
    description: string,
    length: string,
    type: string,
    content: string,
    lessons: Types.ObjectId[]
}

const LectureSchema = new Schema({
    courseId: {type: Schema.ObjectId, ref: 'Course', required: true},
    name: {type: String, required: false},
    description: {type: String, required: false},
    length: {type: String, required: false},
    type: {type: String, required: false},
    content: {type: String, required: false},
    lessons: [{type: Schema.ObjectId, ref: "Lesson"}]
});


const Lecture = model<LectureDocument>('Lecture', LectureSchema);


export default Lecture;
