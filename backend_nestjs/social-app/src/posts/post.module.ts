import { Module} from '@nestjs/common'
import { MongooseModule } from '@nestjs/mongoose';
import { Post, PostSchema } from './Post.schema';
import { PostController } from './post.controller';
import { PostsService } from './post.service';
import { AuthModule } from 'src/users/auth.module';
import { JwtModule } from '@nestjs/jwt';

@Module({
    imports: [
        AuthModule,
        MongooseModule.forFeature([{name: Post.name, schema: PostSchema}]),
        JwtModule.register({
                    secret: 'dzvdlodijecx,ùxpauhuzpbaz_j"à_éà',
                    signOptions: { expiresIn: '1h' }
                }),
    ],
    controllers: [PostController],
    providers: [PostsService],
    exports: [PostsService]

})
export class PostModule {}
