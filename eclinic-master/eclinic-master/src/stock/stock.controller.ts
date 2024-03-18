import { Body, Controller, Get, Param, Patch, Post } from '@nestjs/common';
import { StockService } from './stock.service';
import { Stock } from './stock.schema';

@Controller('stocks')
export class StockController {
    constructor(private readonly stockService: StockService) { }

    @Get(':id')
    async getLocationStock(@Param('id')shortCode: string) {
        return await this.stockService.findOne(shortCode)
    }

    @Get()
    async findAll() {
        return await this.stockService.findAll()
    }

    @Post()
    async create(@Body() stock: Stock) {
        return await this.stockService.create(stock)
    }

    @Patch()
    async update(@Body() stock: Stock) {
        return await this.stockService.update(stock)
    }
}
