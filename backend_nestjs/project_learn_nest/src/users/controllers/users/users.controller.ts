import { Body, Controller, Get, HttpException, HttpStatus, Param, ParseBoolPipe, ParseIntPipe, Post, Query, UseGuards, UsePipes, ValidationPipe} from '@nestjs/common';
import { Response,Request } from 'express';
import { CreateUserDto } from 'src/users/dtos/CreateUser.dto';
import { AuthGuard } from 'src/users/guards/auth/auth.guard';
import { UsersService } from 'src/users/services/users/users.service';

@Controller('users')
export class UsersController {
    constructor(private userService: UsersService) {
        
    }
    @Get()
    @UseGuards(AuthGuard)
    getUsers() {
        return this.userService.fetchUsers();
    }

    // @Get('posts')
    // getUsersPosts() {
    //     return [
    //         {
    //             username: 'Jawk', 
    //             email: 'jawkawume@gmail.com',
    //             posts: [
    //                 {
    //                     id:1,
    //                     title:'Post 1'
    //                 },
    //                 {
    //                     id:2,
    //                     title:'Post 2'
    //                 },
    //             ]
    //         }
    //     ]
    // }

    // @Get('posts/comments')
    // getUsersPostsComments() {
    //     return [
    //         {
    //             username: 'Jawk', 
    //             email: 'jawkawume@gmail.com',
    //             posts: [
    //                 {
    //                     id:1,
    //                     title:'Post 1',
    //                     comments: []
    //                 },
    //                 {
    //                     id:2,
    //                     title:'Post 2',
    //                     comments: []
    //                 },
    //             ]
    //         }
    //     ]
    // }

    @Post('create')
    @UsePipes(new ValidationPipe())
    createUser(@Body() userData: CreateUserDto){
        console.log(userData);
        return this.userService.createUser(userData);
       
    }

    @Get(':id')
    getUserById(@Param('id',ParseIntPipe) id:number) {
        console.log(id);
        const user = this.userService.fetchUserById(id);
        if(!user) throw new HttpException('User Not Found!!!',HttpStatus.BAD_REQUEST)
        return user;
    }
}
