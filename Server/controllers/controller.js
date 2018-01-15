const mongoose = require('mongoose');

const IdeaSchema = new mongoose.Schema(
    {
        content: {type: String, required: true}
    }
)