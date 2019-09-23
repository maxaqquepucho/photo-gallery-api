import multer from "multer";
import uuidv4 from 'uuid/v4'
import path from 'path'

const storage = multer.diskStorage({
    destination: 'uploads',
    filename: (req, file, cb) => {
        cb(null, uuidv4() + path.extname(file.originalname) )
    }
})

export default multer({ storage });