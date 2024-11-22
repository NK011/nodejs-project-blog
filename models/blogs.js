const { Schema, model } = require("mongoose");

const blogSchema = new Schema(
    {
        title: {
            type: String,
            required: true,
        },
        body: {
            type: String,
            required: true,
        },
        coverImageURL: {
            type: String,
        },
        createBy: {
            type: Schema.Types.UUID,
            required: true,
        },
    },
    {
        timestamps: true,
    }
);

const Blog = model("blog", blogSchema);

module.exports = Blog;
