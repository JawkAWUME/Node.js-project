import { Injectable} from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Post } from "./Post.schema";
import { Model } from "mongoose";

@Injectable()
export class PostsService {
    constructor(@InjectModel(Post.name) private postModel: Model<Post>){}

    async createPost(userId: string,content: string): Promise<Post> {
        const newPost = new this.postModel({user: userId,content})
        return newPost.save();
    }

    async findAllPosts() : Promise<Post[]> {
        return this.postModel.find().populate('user').populate('comments').exec()
    }

    async likePost(postId: string,userId: string) {
        return this.postModel.findByIdAndUpdate(postId,{$addToSet: {likes: userId}}, {new: true}).exec();
    }


}