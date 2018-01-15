const mongoose = require('mongoose');

const LikeSchema = new mongoose.Schema(
    {
        userID: {type: Number, required: true},
        ideaID: {type: Number, required: true}
    },
    {
        timestamps: true
    }
);

mongoose.model("Like", LikeSchema);