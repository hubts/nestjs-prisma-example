import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PrismaService } from './prisma.service';
import { UserService } from './user.service';
import { PostService } from './post.service';

@Module({
    imports: [],
    controllers: [AppController],
    providers: [AppService, PrismaService, UserService, PostService],
})
export class AppModule {}
