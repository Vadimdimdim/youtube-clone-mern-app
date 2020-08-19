const express = require('express');
const router = express.Router();

const { Comment } = require("../models/comment");
const { auth } = require("../middleware/auth");

router.post("/saveComment", auth, (req, res) => {
    const comment = new Comment(req.body);

    comment.save((err, doc) => {
        if (err) return res.json({ success: false, err })

        Comment.find({ '_id': comment._id })
            .populate('author')
            .exec((err, result) => {
                if (err) return res.json({ success: false, err })
                return res.status(200).json({ success: true, result })
            })
    })
});

router.post("/getComments", (req, res) => {
    Comment.find({ "postId": req.body.videoId })
        .populate('author')
        .exec((err, comments) => {
            if (err) return res.status(400).send(err)
            res.status(200).json({ success: true, comments })
        })
});

module.exports = router;