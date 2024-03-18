import { Body, Controller, Delete, Get, Param, Patch, Post } from '@nestjs/common';
import { Panchakarma } from './panchakarma.schema';
import { PanchakarmaService } from './panchakarma.service';

@Controller('panchakarmas')
export class PanchakarmaController {
    constructor(private readonly panchakarmaService: PanchakarmaService){}

    @Get()
    async findAll() {
        return await this.panchakarmaService.findAll()
    }

    @Get(':id')
    async findOne(@Param('id') id: string) {
        return await this.panchakarmaService.findOne(id)
    }

    @Post()
    async create(@Body() panchakarma: Panchakarma) {
        return await this.panchakarmaService.create(panchakarma)
    }

    @Patch(':id')
    async update(@Param('id') id: string, @Body() panchakarma: Panchakarma) {
        return await this.panchakarmaService.update(id, panchakarma)
    }

    @Delete(':id')
    async delete(@Param('id') id: string) {
        return await this.panchakarmaService.delete(id)
    }
}
