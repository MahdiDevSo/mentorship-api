 import express from 'express';
import { getPosts, getPost } from  '../controllers/getPosts.js';
const router = express.Router();


router.get("/", getPosts);
router.get("/:id", getPost);


// export the router
export default router