import { Body, Controller, Get, Param, Patch, Post } from '@nestjs/common';
import { identity } from 'rxjs';
import { Patient } from './patient.schema';
import { PatientService } from './patient.service';

@Controller('patients')
export class PatientController {
    constructor(private readonly patientService: PatientService) { }

    @Get()
    async findAll() {
        return await this.patientService.findAll()
    }

    @Get('nextId/:id')
    async getNextId(@Param('id') id: string) {
        return await this.patientService.getNextId(id)
    }

    @Get(':id')
    async findOne(@Param('id') id: string) {
        return await this.patientService.findOne(id)
    }

    @Post()
    async create(@Body() patient: Patient) {
        return await this.patientService.create(patient)
    }

    @Patch(':id')
    async update(@Param('id') id: string, @Body() patient: Patient) {
        return await this.patientService.update(id, patient)
    }
}
