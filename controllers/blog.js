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
        Blog.aggregate([
            {
                $project: {
                    Title: "$Title",
                    imagePath: "$imagePath",
                },
            },
        ]).then((result) => {
            let data = Response(Constants.RESULT_CODE.OK, Constants.RESULT_FLAG.SUCCESS, '', result);
            return res.send(data);
        }
        ).catch((err) => {
            let data = Response(Constants.RESULT_CODE.ERROR, Constants.RESULT_FLAG.FAIL, err);
            return res.send(data);
        }
        );
    })

    static getOne = asyncWrapper(async (req, res) => {
        const post = await Blog.findById(req.params.Id);
        let data = Response(Constants.RESULT_CODE.OK, Constants.RESULT_FLAG.SUCCESS, '', post);
        return res.send(data);
    })

}

export default Blogs;

