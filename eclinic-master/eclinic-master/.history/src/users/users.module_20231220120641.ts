import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { UsersController } from './users.controller';
import { User, UserSchema } from './users.schema';
import { UsersService } from './users.service';
import { MulterModule } from '@nestjs/platform-express';

@Module({
  imports: [MongooseModule.forFeature([{ name: User.name, schema: UserSchema }]), MulterModule.register({
    dest: './uploads', // Destination folder for uploaded files
  }),],
  controllers: [UsersController],
  providers: [UsersService]
})
export class UsersModule { }
