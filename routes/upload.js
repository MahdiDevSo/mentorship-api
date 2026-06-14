import  express from'express';
import { protect } from '../Middlewares/auth.js'
import { upload } from '../Middlewares/upload.js';
import { uploadFile } from '../controllers/uploadController.js';
const router = express.Router();

router.post("/profile-picture", protect, upload.single('file'), uploadFile)




// export the router
export default router;