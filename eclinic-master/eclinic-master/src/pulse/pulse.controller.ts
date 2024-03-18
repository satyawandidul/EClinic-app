import { Body, Controller, Get, Param, Patch, Post } from '@nestjs/common';
import { Pulse } from './pulse.schema';
import { PulseService } from './pulse.service';

@Controller('pulses')
export class PulseController {
    constructor(private readonly pulseService: PulseService) { }

    @Get()
    async findAll() {
        return await this.pulseService.findAll()
    }

    @Post()
    async create(@Body() pulse: Pulse) {
        return await this.pulseService.create(pulse)
    }

    @Patch(':id')
    async update(@Param('id') id: string, @Body() pulse: Pulse) {
        return await this.pulseService.update(id, pulse)
    }
}
