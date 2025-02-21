import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import mongoose, { Document } from "mongoose";
import { User } from "src/users/User.schema";



@Schema({ timestamps: true})
export class Post extends Document{
    @Prop({ required : true})
    content: string;

    @Prop({ required : true, type: mongoose.Schema.Types.ObjectId, ref: 'User'})
    user: User;

    @Prop({ required : true, type: mongoose.Schema.Types.ObjectId, ref: 'User'})
    likes: User[];

    @Prop({ required : true, type: mongoose.Schema.Types.ObjectId, ref: 'Comment'})
    comments: Comment[];

}

export const PostSchema = SchemaFactory.createForClass(Post)