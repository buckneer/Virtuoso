
import express from 'express';
import "dotenv/config"
import cors from "cors"
import log, { errorHandler, requestLogger, unknownEndpoint } from "./logger";
import connectDB from "./db/connect";
const path = require('path')
import routes from "./routes";
import multer from "multer";


const app = express();

const PORT = process.env.PORT || 1337;

app.use(cors());
app.use(express.json())
app.use(express.urlencoded({extended: false}))
app.use(requestLogger);


const storage = multer.diskStorage({
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

export const upload = multer({ storage });


routes(app)
app.use('/uploads', express.static(path.join(__dirname, '../uploads')));

app.use(unknownEndpoint)
app.use(errorHandler)



app.listen(PORT, () => {
	log.info(`Server running on port: ${PORT}`)
	connectDB();

})


