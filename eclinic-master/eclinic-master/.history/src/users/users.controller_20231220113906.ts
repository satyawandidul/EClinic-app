import { Body, Put, Controller, UploadedFile, UseInterceptors, Delete, Get, Param, Patch, Post } from '@nestjs/common';
import { User } from './users.schema';
import { UsersService } from './users.service';
import { FileInterceptor } from '@nestjs/platform-express';

@Controller('users')
export class UsersController {
    constructor(private readonly usersService: UsersService) { }

    @Post()
    @UseInterceptors(FileInterceptor('base64'))
    async createUser(@Body() user: any, @UploadedFile() base64: Express.Multer.File) {

        // Process user and base64 as needed
        user.base64 = base64.buffer.toString('base64'); // Assuming 'base64' is a field in your UserSchema
        return this.usersService.create(user);
    }

    @Put(':id')
    @UseInterceptors(FileInterceptor('base64'))
    async updateUser(@Param('id') id: string, @Body() user: any, @UploadedFile() base64: Express.Multer.File) {
        // Process user and base64 as needed
        user.base64 = base64.buffer.toString('base64'); // Assuming 'base64' is a field in your UserSchema
        return this.usersService.update(id, user);
    }


    @Get()
    async findAll() {
        return await this.usersService.findAll()
    }


    @Get(':id')
    async findOne(@Param('id') id: string) {
        return await this.usersService.findOne(id)
    }

    @Post()
    async create(@Body() user: User) {
        return await this.usersService.create(user)
    }

    @Patch(':id')
    async update(@Param('id') id: string, @Body() user: User) {
        return await this.usersService.update(id, user)
    }

    @Delete(':id')
    async delete(@Param('id') id: string) {
        return await this.usersService.delete(id)
    }
}
