import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import mongoose, { Document } from 'mongoose';
import { Post } from "src/posts/Post.schema";

@Schema({timestamps:true})
export class User extends Document {
    @Prop({ required: true , unique: true})
    username: string;

    @Prop({ required: true, unique: true})
    email: string;

    @Prop({ required: true})
    password:string;

    @Prop({ type: [{type: mongoose.Schema.Types.ObjectId, ref: 'Post'}] })
    posts: Post[];

    @Prop({ type: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User'}]})
    followers: User[];

    @Prop({ type: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User'}]})
    following: User[];

   
}

export const UserSchema = SchemaFactory.createForClass(User);


