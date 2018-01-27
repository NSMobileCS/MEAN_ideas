const mongoose = require('mongoose');

const LikeSchema = new mongoose.Schema(
    {
        userID: {type: String, required: true},
        ideaID: {type: String, required: true}
    },
    {
        timestamps: true
    }
);

mongoose.model("Like", LikeSchema);