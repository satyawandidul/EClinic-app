import { Body, Controller, Delete, Get, Param, Patch, Post } from '@nestjs/common';
import { Medicine } from './medicine.schema';
import { MedicineService } from './medicine.service';

@Controller('medicines')
export class MedicineController {
    constructor(private readonly medicineService: MedicineService){}

    @Get()
    async findAll() {
        return await this.medicineService.findAll()
    }

    @Get(':id')
    async findOne(@Param('id') id: string) {
        return await this.medicineService.findOne(id)
    }

    @Post()
    async create(@Body() medicine: Medicine) {
        return await this.medicineService.create(medicine)
    }

    @Patch(':id')
    async update(@Param('id') id: string, @Body() medicine: Medicine) {
        return await this.medicineService.update(id, medicine)
    }

    @Delete(':id')
    async delete(@Param('id') id: string) {
        return await this.medicineService.delete(id)
    }
}
