import { Body, Controller, Delete, Get, Param, Put, UseGuards } from "@nestjs/common";
import { UserService } from "./user.service";
import { User } from "./User.schema";
import { JwtAuthGuard } from "./jwt-auth.guard";

@Controller("users")
export class UserController {
    constructor(private readonly userService: UserService) {}

    @Get()
    async getAllUsers(): Promise<User[]> {
        return this.userService.findAll();
    }

    @Get(":id")
    async getUserById(@Param("id") id: string): Promise<User |null> {
        const user = this.userService.findUserById(id);
        if (user) {
            return user;
        }
        return null;
       
    }

    @UseGuards(JwtAuthGuard)
    @Put(":id")
    async updateUser(@Param("id") id: string, @Body() updateData: User) {
        return this.userService.updateUser(id,updateData);
    }

    @UseGuards(JwtAuthGuard)
    @Delete(":id")
    async deleteUser(@Param("id") id: string) {
        return this.userService.deleteUser(id);
    }

    @UseGuards(JwtAuthGuard)
    @Put(":id/follow")
    async followUser (@Param("id") id:string, @Body("userId") userId:string) {
        return this.userService.followUser(userId,id)
    }

    @UseGuards(JwtAuthGuard)
    @Put(":id/unfollow")
    async unfollowUser(@Param("id") id: string, @Body("userId") userId:string){
        return this.userService.unfollowUser(userId,id)
    }

    @Get(":id/followers")
    async getFollowers(@Param("id") id:string) {
        return this.userService.getFollowers(id);
    }

    @Get(":id/following")
    async getFollowing(@Param("id") id:string) {
        return this.userService.getFollowing(id);
    }
}
