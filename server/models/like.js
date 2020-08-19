const mongoose = require('mongoose');

const likeSchema = mongoose.Schema({
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


const Like = mongoose.model('like', likeSchema);

module.exports = { Like }