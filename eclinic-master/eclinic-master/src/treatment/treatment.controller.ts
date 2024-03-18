import { Body, Controller, Delete, Get, Param, Patch, Post } from '@nestjs/common';
import { TreatmentService } from './treatment.service';
import { Treatment } from './treatment.schema';

@Controller('treatments')
export class TreatmentController {
    constructor(private readonly treatmentService: TreatmentService) { }

    @Get()
    async findAll() {
        return await this.treatmentService.findAll()
    }

    @Get(':id')
    async findOne(@Param('id') id: string) {
        return await this.treatmentService.findOne(id)
    }

    @Post()
    async create(@Body() treatment: Treatment) {
        return await this.treatmentService.create(treatment)
    }

    @Patch(':id')
    async update(@Param('id') id: string, @Body() treatment: Treatment) {
        return await this.treatmentService.update(id, treatment)
    }

    @Delete(':id')
    async delete(@Param('id') id: string) {
        return await this.treatmentService.delete(id)
    }
}
