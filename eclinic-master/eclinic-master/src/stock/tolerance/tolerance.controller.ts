import { Body, Controller, Get, Param, Patch, Post } from '@nestjs/common';
import { ToleranceService } from './tolerance.service';
import { Tolerance } from './tolerance.schema';

@Controller('tolerance')
export class ToleranceController {
    constructor(private readonly tolernaceService: ToleranceService) { }

    @Get()
    async findAll() {
        return await this.tolernaceService.findAll()
    }

    @Get(':id')
    async findOne(@Param('id') id: string) {
        return await this.tolernaceService.findOne(id)
    }

    @Post()
    async create(@Body() tolerance: Tolerance) {
        return await this.tolernaceService.create(tolerance)
    }

    @Patch(':id')
    async update(@Param('id') id: string, @Body() tolerance: Tolerance) {
        return await this.tolernaceService.update(id, tolerance)
    }
}
