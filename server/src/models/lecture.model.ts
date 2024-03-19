import { Document, Schema, model } from "mongoose";
import { LessonDocument } from "./lesson.model";

export interface LectureDocument extends Document {
    courseId: string,
    name: string,
    description: string,
    length: string,
    type: string,
    content: string,
    lessons: LessonDocument[]
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