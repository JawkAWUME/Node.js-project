import { Module, forwardRef } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AuthController } from './auth.controller';
import { User, UserSchema } from './User.schema';
import { UserService } from './user.service';
import { AuthService } from './auth.service';
import { JwtModule } from '@nestjs/jwt';
import { UserController } from './user.controller';
import { JwtStrategy } from './jwt.strategy';


@Module({
    imports: [
        MongooseModule.forFeature([{ name: User.name, schema: UserSchema }]),
        JwtModule.register({
            secret: 'dzvdlodijecx,ùxpauhuzpbaz_j"à_éà',
            signOptions: { expiresIn: '1h' }
        }),
    ],
    providers: [AuthService,UserService],
    controllers: [AuthController,UserController],
    exports: [AuthService,UserService]
})
export class AuthModule {}
