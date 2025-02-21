import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AuthModule } from './users/auth.module';
import { PostModule } from './posts/post.module';

@Module({
  imports: [
    MongooseModule.forRoot('mongodb://127.0.0.1:27017/social_app'),
    AuthModule,
    PostModule
  ]
})
export class AppModule {}
