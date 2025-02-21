import { Controller, Post, Req, Body, UseGuards } from "@nestjs/common";
import { JwtAuthGuard } from "src/users/jwt-auth.guard";
import { PostsService } from "./post.service";


@Controller('posts')
export class PostController {
    constructor(private postService:PostsService){}

    @UseGuards(JwtAuthGuard)
    @Post()
    async createPost(@Req() req , @Body() body){
        return this.postService.createPost(req.user.sub,body.content);
    }

}