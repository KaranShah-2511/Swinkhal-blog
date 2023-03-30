import express from 'express';
const router = express.Router();
import Blogs from "../controllers/blog.js";
import upload from '../middleware/fileUpload.js';


router.post('/', upload.single('image'), Blogs.create);

router.get('/getAll', Blogs.getAll);

router.get('/singleBlog/:Id', Blogs.getOne);


export default router;
