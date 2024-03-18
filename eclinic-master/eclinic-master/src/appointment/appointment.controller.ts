import { Body, Controller, Get, Param, Patch, Post } from '@nestjs/common';
import { Appointment } from './appointment.schema';
import { AppointmentService } from './appointment.service';

@Controller('appts')
export class AppointmentController {
    constructor(
        private readonly apptService: AppointmentService
    ) { }

    @Get()
    async findAll() {
        return await this.apptService.findAll()
    }

    @Get(':id')
    async findOne(@Param('id') id: string) {
        return await this.apptService.findOne(id)
    }

    @Get('doctor/:id')
    async findByDocId(@Param('id') id: string) {
        return await this.apptService.getApptsByDocId(id)
    }

    @Get('dates/:date')
    async findByDate(@Param('date') date: Date) {
        return await this.apptService.getApptsByDate(date)
    }


    @Post()
    async create(@Body() appt: Appointment) {
        return await this.apptService.create(appt)
    }

    @Patch(':id')
    async update(@Param('id') id: string, @Body() appt: Appointment) {
        return await this.apptService.update(id, appt)
    }
}
