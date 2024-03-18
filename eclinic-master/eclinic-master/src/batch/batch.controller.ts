import { Body, Controller, Delete, Get, Param, Patch, Post } from '@nestjs/common';
import { Batch } from './batch.schema';
import { BatchService } from './batch.service';

@Controller('batches')
export class BatchController {
    constructor(private readonly batchService: BatchService){}

    @Get()
    async findAll() {
        return await this.batchService.findAll()
    }

    @Get(':id')
    async findOne(@Param('id') id: string) {
        return await this.batchService.findOne(id)
    }

    @Post()
    async create(@Body() batch: Batch) {
        return await this.batchService.create(batch)
    }

    @Patch(':id')
    async update(@Param('id') id: string, @Body() batch: Batch) {
        return await this.batchService.update(id, batch)
    }

    @Delete(':id')
    async delete(@Param('id') id: string) {
        return await this.batchService.delete(id)
    }
}
