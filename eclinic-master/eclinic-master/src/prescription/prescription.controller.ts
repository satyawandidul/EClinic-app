import { Body, Controller, Get, Param, Patch, Post } from '@nestjs/common';
import { Prescription } from './prescription.schema';
import { PrescriptionService } from './prescription.service';

@Controller('prescriptions')
export class PrescriptionController {
    constructor(private readonly prescriptionService: PrescriptionService) { }

    @Get()
    async findAll() {
        return await this.prescriptionService.findAll()
    }

    @Get(':id')
    async findOne(@Param('id') id: string) {
        return await this.prescriptionService.findOne(id)
    }

    @Post()
    async create(@Body() prescription: Prescription) {
        return await this.prescriptionService.create(prescription)
    }


    @Patch(':id')
    async update(@Param('id') id: string, prescription: Prescription) {
        return await this.prescriptionService.update(id, prescription)
    }
}
