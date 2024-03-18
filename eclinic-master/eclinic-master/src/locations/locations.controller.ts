import { Body, Controller, Delete, Get, Param, Patch, Post } from '@nestjs/common';
import { LocationsService } from './locations.service';
import { Location } from './locations.schema'

@Controller('locations')
export class LocationsController {
    constructor(private readonly locationsService: LocationsService){}

    @Get()
    async findAll() {
        return await this.locationsService.findAll()
    }

    @Get(':id') 
    async findOne(@Param('id') id: string) {
        return await this.locationsService.findOne(id)
    }

    @Post()
    async create(@Body() location: Location) {
        return await this.locationsService.create(
        location)
    }

    @Patch(':id')
    async update(@Param('id') id: string, @Body() location: Location) {
        return await this.locationsService.update(id, location)
    }

    @Delete(':id')
    async delete(@Param('id') id: string) {
        return await this.locationsService.delete(id)
    }
}
