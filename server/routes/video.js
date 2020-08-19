const express = require('express');
const router = express.Router();
const multer = require('multer');
const ffmpeg = require('fluent-ffmpeg');

const { Video } = require("../models/video");
const {Subscriber} = require("../models/subscriber");

var storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads/')
    },
    filename: (req, file, cb) => {
        cb(null, `${Date.now()}_${file.originalname}`)
    },
    fileFilter: (req, file, cb) => {
        const ext = path.extname(file.originalname)
        if (ext !== '.mp4') {
            return cb(res.status(400).end('only mp4 files are allowed'), false);
        }
        cb(null, true)
    }
});

var upload = multer({ storage: storage }).single("file")

router.post("/uploadfiles", (req, res) => {
    upload(req, res, err => {
        if (err) {
            console.log(err);
            return res.json({ success: false, err })
        }
        return res.json({ success: true, filePath: res.req.file.path, fileName: res.req.file.filename })
    })
});

router.post("/thumbnail", (req, res) => {

    let thumbsFilePath = "";
    let fileDuration = "";

    ffmpeg.ffprobe(req.body.filePath, (err, metadata) => {
        // console.log(req.body.filePath);
        // console.dir(metadata);
        // console.log(metadata.format.duration);

        fileDuration = metadata.format.duration;
    })


    ffmpeg(req.body.filePath)
        .on('filenames', function (filenames) {
            // console.log('Will generate ' + filenames.join(', '))
            thumbsFilePath = "uploads/thumbnails/" + filenames[0];
        })
        .on('end', function () {
            // console.log('Screenshots taken');
            return res.json({ success: true, thumbsFilePath: thumbsFilePath, fileDuration: fileDuration })
        })
        .screenshots({
            // Will take screens at 20%, 40%, 60% and 80% of the video
            count: 3,
            folder: 'uploads/thumbnails',
            size: '320x240',
            // %b input basename ( filename w/o extension )
            filename: 'thumbnail-%b.png'
        });

});

router.get("/getVideos", (req, res) => {

    Video.find()
        .populate('author')
        .exec((err, videos) => {
            if(err) return res.status(400).send(err);
            res.status(200).json({ success: true, videos })
        })

});

router.post("/uploadVideo", (req, res) => {
    const video = new Video(req.body)
    
    video.save((err, video) => {
        if (err) return res.status(400).json({ success: false, err })
        return res.status(200).json({ success: true, video})
    })

});

router.post("/getVideo", (req, res) => {
    Video.findOne({"_id": req.body.videoId})
        .populate('author')
        .exec((err, video) => {
            if(err) return res.status(400).send(err);
            return res.status(200).json({ success: true, video })
        })
});

router.post("/getSubscriptionVideos", (req, res) => {
    //Need to find all subscriptions
    Subscriber.find({'userFrom': req.body.userFrom})
        .exec((err, subscribers) => {
            if (err) return res.status(400).send(err);

            let subscribedUser = [];

            subscribers.map((subscriber, index) => {
                subscribedUser.push(subscriber.userTo);
            })

            //Need to Fetch all videos from subscribtions
            Video.find({author: {$in: subscribedUser}})
                .populate('author')
                .exec((err, videos) => {
                    if(err) return res.status(400).send(err);
                    res.status(200).json({ success: true, videos })
                })
        })
});

router.put('/:id', (req, res) => {
    Video.findByIdAndUpdate({_id: req.params.id}, req.body)
        .exec((err, video) => {
            if (err) return res.status(400).json({ success: false, err })
            // console.log(video.views)
            return res.status(200).json({ success: true, video})
        })
})


module.exports = router;