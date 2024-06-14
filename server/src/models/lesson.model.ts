import {Document, Schema, model, Types} from "mongoose";


export interface LessonDocument extends Document {
    lectureId: Types.ObjectId;
    name: string;
    type: string;
    media: string;
    description: string;
    tabs: string;
    attachments: string[];
}


const LessonSchema = new Schema({
    lectureId: {type: Schema.ObjectId, ref: 'Lecture'},
    name: {type: String, required: true},
    type: {type: String, required: false},
    media: {type: String, required: false},
    description: {type: String, required: false},
    tabs: {type: String, required: false},
    attachments: [{type: String, required: false}]
});


const Lesson = model<LessonDocument>('Lesson', LessonSchema);

export default Lesson;
