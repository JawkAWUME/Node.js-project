import { Prop, Schema , SchemaFactory } from "@nestjs/mongoose";
import { UserSettings } from "./UserSettings.schema";
import mongoose from "mongoose";
import { Post } from "./Post.schema";

@Schema()
export class User {
    @Prop({unique: true , required: true})
    username:string

    @Prop({required: false})
    displayName?: string

    @Prop({required: false})
    avatarUrl?:string

    @Prop({type:mongoose.Schema.Types.ObjectId,ref: 'UserSettings'})
    settings?: UserSettings;

    @Prop({type: [{type:mongoose.Schema.Types.ObjectId,ref: 'Post'}]})
    posts: Post[];
    
}

export const UserSchema = SchemaFactory.createForClass(User)