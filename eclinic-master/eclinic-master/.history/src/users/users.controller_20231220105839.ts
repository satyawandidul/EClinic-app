import { Body, Controller, Delete, Get, Param, Patch, Post } from '@nestjs/common';
import { User } from './users.schema';
import { UsersService } from './users.service';
import { FileInterceptor } from '@nestjs/platform-express';

@Controller('users')
export class UsersController {
    constructor(private readonly usersService: UsersService) { }




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
