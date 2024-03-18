import { Body, Controller, Get, Param, Patch, Post } from '@nestjs/common';
import { Charges } from './charges.schema';
import { ChargesService } from './charges.service';

@Controller('charges')
export class ChargesController {
    constructor(private readonly chargesService: ChargesService) { }

    @Get()
    async findAll() {
        return await this.chargesService.findAll()
    }

    @Get(':id')
    async findOne(@Param('id') id: string) {
        return await this.chargesService.findOne(id)
    }

    @Post()
    async create(@Body() charges: Charges) {
        return await this.chargesService.create(charges)
    }

    @Patch(':id')
    async update(@Param('id') id: string, @Body() charges: Charges) {
        return await this.chargesService.update(id, charges)
    }
}
