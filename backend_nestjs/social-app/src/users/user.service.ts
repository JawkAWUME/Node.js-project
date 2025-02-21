import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { User } from "./User.schema";
import * as bcrypt from 'bcrypt';
import { Injectable, NotFoundException } from "@nestjs/common";

@Injectable()
export class UserService {
    constructor(@InjectModel(User.name) private userModel:Model<User>){}

    async createUser(username: string, email: string, password: string): Promise<User> {
        const hashedPassword = await bcrypt.hash(password,10);
        const newUser = new this.userModel({username,email,password: hashedPassword})
        return newUser.save();
    }

    async findAll(): Promise<User[]> {
        return this.userModel.find().select("-password").exec();
    } 

    async findUserByEmail(email:string): Promise<User | null> {
        return this.userModel.findOne({email}).exec();
    }

    async findUserById(id:string) : Promise<User |null> {
        const user = this.userModel.findById(id).select('-password').populate('posts');
        if (!user) throw new NotFoundException("Utilisateur Non Trouvé!!!");
        return user;
    }

    async updateUser(id: string, updateData: User) {
        const user = await this.userModel.findByIdAndUpdate(id, updateData, {new:true}).select("-password");
        if(!user) throw new NotFoundException("Utilisateur Non Trouvé!!!")
        return user;
    }

    async deleteUser(id: string) {
        const result = await this.userModel.findByIdAndDelete(id);
        if (!result) throw new NotFoundException("Utilisateur Non Trouvé!!!")
        return {message: "Utilisateur supprimé avec succès"}
    }

    async followUser(userId: string, targetUserId: string){
        await this.userModel.findByIdAndUpdate(userId, {$push : {following: targetUserId}})
        await this.userModel.findByIdAndUpdate(targetUserId, {$push : {followers: userId}})
    }

    async unfollowUser(userId: string, targetId:string) {
        const user = await this.userModel.findById(userId)
        const targetUser = await this.userModel.findById(targetId)
        if (!user || !targetUser) throw new NotFoundException("Utilisateur Non Trouvé!!!")

            user.following = user.following.filter(id => id.toString()!== targetId );
            targetUser.followers = targetUser.following.filter(id=> id.toString()!== userId )

            await user.save()
            await targetUser.save()

            return {message: `Vous ne suivez plus ${targetUser.username}`};
    }

    async getFollowers(id: string) {
        const user = await this.userModel.findById(id).populate("followers","username email");
        if(!user) throw new NotFoundException("Utilisateur Non Trouvé!!!")
        return user.followers;
    }

    async getFollowing(id: string) {
        const user = await this.userModel.findById(id).populate("followers","username email");
        if(!user) throw new NotFoundException("Utilisateur Non Trouvé!!!")
        return user.followers;
    }
}