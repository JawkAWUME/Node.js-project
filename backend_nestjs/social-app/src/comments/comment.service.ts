import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";

@Injectable()
export class CommentService {
    constructor(@InjectModel(Comment.name) private commentModel: Model<Comment>) {}
    async addComment(userId: string, postId: string, text:string) {
        const newComment = new this.commentModel({uesr: userId,post:postId,text})
        return newComment.save()
    }

    async likeComment(commentId: string, userId: string) {
        return this.commentModel.findByIdAndUpdate(commentId, {$addToSet: {likes: userId}},{new: true}).exec();
    }

    
}