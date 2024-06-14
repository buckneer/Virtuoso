import {Types} from "mongoose";
import multer from "multer";

export const objectId = (id: string) => new Types.ObjectId(id);

export const storage = multer.diskStorage({
	destination: (req, file, cb) => {
		if (file.fieldname === 'photo') {
			cb(null, 'uploads/photos/');
		} else if (file.fieldname === 'attachments') {
			cb(null, 'uploads/attachments/');
		}
	},
	filename: (req, file, cb) => {
		cb(null, `${Date.now()}-${file.originalname}`);
	}
});
