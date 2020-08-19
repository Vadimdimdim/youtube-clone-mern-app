const mongoose = require('mongoose');

const dislikeSchema = mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user'
    },
    commentId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'comment'
    },
    videoId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'video'
    }
}, { timestamps: true })


const Dislike = mongoose.model('dislike', dislikeSchema);

module.exports = { Dislike }