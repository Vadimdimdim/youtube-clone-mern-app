const express = require('express');
const router = express.Router();

const { Like } = require("../models/like");
const { Dislike } = require("../models/dislike");

const { auth } = require("../middleware/auth");

router.post("/getLikes", (req, res) => {
    let variable = {}
    if(req.body.videoId){
        variable = {videoId: req.body.videoId, userId: req.body.userId}
    }else{
        variable = {commentId: req.body.commentId, userId: req.body.userId}
    }

    Like.find(variable)
        .exec((err, likes) => {
            if(err) return res.status(400).send(err);
            res.status(200).json({success: true, likes})
        })
});

router.post("/getDislikes", (req, res) => {
    let variable = {}
    if(req.body.videoId){
        variable = {videoId: req.body.videoId, userId: req.body.userId}
    }else{
        variable = {commentId: req.body.commentId, userId: req.body.userId}
    }

    Dislike.find(variable)
        .exec((err, dislikes) => {
            if(err) return res.status(400).send(err);
            res.status(200).json({success: true, dislikes})
        })
});

router.post("/addLike", auth, (req, res) => {
    let variable = {}
    if(req.body.videoId){
        variable = {videoId: req.body.videoId, userId: req.body.userId}
    }else{
        variable = {commentId: req.body.commentId, userId: req.body.userId}
    }

    const like = new Like(variable)

    //save the like data
    like.save((err, likeResult) => {
        if(err) return res.json({success: false, err})
        //in case if video is already disliked
        Dislike.findOneAndDelete(variable)
            .exec((err, dislikeResult) => {
                if(err) return res.status(400).json({success: false, err});
                res.status(200).json({success: true});
            })
    })

});

router.post("/removeLike", auth, (req, res) => {
    let variable = {}
    if(req.body.videoId){
        variable = {videoId: req.body.videoId, userId: req.body.userId}
    }else{
        variable = {commentId: req.body.commentId, userId: req.body.userId}
    }

    Like.findOneAndDelete(variable)
        .exec((err, result) => {
            if(err) return res.status(400).json({success: false, err})
            res.status(200).json({success: true})
        })

});

router.post("/addDislike", auth, (req, res) => {
    let variable = {}
    if(req.body.videoId){
        variable = {videoId: req.body.videoId, userId: req.body.userId}
    }else{
        variable = {commentId: req.body.commentId, userId: req.body.userId}
    }

    const dislike = new Dislike(variable)

    //save the dislike data
    dislike.save((err, dislikeResult) => {
        if(err) return res.json({success: false, err})
        //in case if video is already liked
        Like.findOneAndDelete(variable)
            .exec((err, likeResult) => {
                if(err) return res.status(400).json({success: false, err});
                res.status(200).json({success: true});
            })
    })

});

router.post("/removeDislike", auth, (req, res) => {
    let variable = {}
    if(req.body.videoId){
        variable = {videoId: req.body.videoId, userId: req.body.userId}
    }else{
        variable = {commentId: req.body.commentId, userId: req.body.userId}
    }

    Dislike.findOneAndDelete(variable)
        .exec((err, result) => {
            if(err) return res.status(400).json({success: false, err})
            res.status(200).json({success: true})
        })

});

module.exports = router;