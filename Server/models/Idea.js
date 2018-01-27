const mongoose = require('mongoose');

const IdeaSchema = new mongoose.Schema(
    {
        body: {type: String, required: true, minlength: 3},
        userID: {type: String, required: true}
    },
    {
        timestamps: true
    }
);

mongoose.model("Idea", IdeaSchema);