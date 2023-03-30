import Blog from "../models/Blog.js"
import asyncWrapper from "../middleware/async.js"
import Response from "../common/Response.js"
import Constants from "../common/Constants.js"


class Blogs {
    static create = asyncWrapper(async (req, res) => {
        const post = new Blog({
            Title: req.body.Title,
            Content: req.body.Content,
            imagePath: req.file.filename
        });
        try {
            await post.save();
            let data = Response(Constants.RESULT_CODE.OK, Constants.RESULT_FLAG.SUCCESS, '', post);
            return res.send(data);
        } catch (err) {
            let data = Response(Constants.RESULT_CODE.ERROR, Constants.RESULT_FLAG.FAIL, err);
            return res.send(data);
        }
    })

    static getAll = asyncWrapper(async (req, res) => {
        const posts = await Blog.find();
        let data = Response(Constants.RESULT_CODE.OK, Constants.RESULT_FLAG.SUCCESS, '', posts);
        return res.send(data);
    })




}

export default Blogs;

