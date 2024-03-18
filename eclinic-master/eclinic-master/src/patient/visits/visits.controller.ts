import { Body, Controller, Get, Param, Patch, Post } from '@nestjs/common';
import { VisitsService } from './visits.service';
import { PatientVisits } from './visits.schema';

@Controller('visits')
export class VisitsController {
    constructor(private readonly visitService: VisitsService) { }

    @Get(':patientId')
    async findAll(@Param('patientId') id: string) {
        return await this.visitService.getVisits(id)
    }

    @Post()
    async create(@Body() visit: PatientVisits) {
        return await this.visitService.create(visit)
    }

    @Patch(':visitId')
    async update(@Param('visitId') id: string, @Body() visit: PatientVisits) {
        return await this.visitService.update(id, visit)
    }

    @Patch('testimonial/:id')
    async updateTestimonial(@Param('id') id: string, @Body() value: boolean) {
        return await this.visitService.updateTestimonial(id, value)
    }
}
