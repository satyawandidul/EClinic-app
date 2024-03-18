import { Body, Controller, Get, Param, Patch, Post } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Srotas } from './srotas.schema';
import { SrotasService } from './srotas.service';

@Controller('srotas')
export class SrotasController {
    constructor(
        private readonly srotasService: SrotasService
    ) { }

    @Get()
    async findAll() {
        return await this.srotasService.findAll()
    }

    @Post()
    async create(@Body() srotas: Srotas) {
        return await this.srotasService.create(srotas)
    }

    @Patch(':id') 
    async update(@Param('id') id: string, srotas: Srotas) {
        return await this.srotasService.update(id, srotas)
    }
}
