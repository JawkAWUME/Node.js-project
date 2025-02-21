import { Injectable } from "@nestjs/common";
import { UserService } from "./user.service";
import { JwtService } from '@nestjs/jwt';
import { User } from "./User.schema";
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
    constructor(private userService: UserService, private jwtService:JwtService){}

    async validateUser(email:string, password: string): Promise<User | null> {
        const user = await this.userService.findUserByEmail(email);
        if (user && await bcrypt.compare(password, user.password)){
            return user;
        }
        return null;
    }

    async login(user: User|null){
        if (user){
            const payload = {username: user.username, sub:user._id}
            return {
                access_token:this.jwtService.sign(payload)
            }
        }
        return null;
    }
}