import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import mongoose from "mongoose";
import { Post } from "src/posts/Post.schema";
import { User } from "src/users/User.schema";

@Schema({timestamps: true})
export class Comment extends Document {
    @Prop({ required: true})
    text: string;

    @Prop({ required: true, type: mongoose.Schema.Types.ObjectId, ref: 'User'})
    user: User

    @Prop({ required: true, type: mongoose.Schema.Types.ObjectId, ref: 'Post'})
    post: Post

}

export const CommentSchema = SchemaFactory.createForClass(Comment);