import { Body, Controller, Get, Param, Patch, Post } from '@nestjs/common';
import { Billing } from './billing.schema';
import { BillingService } from './billing.service';

@Controller('billing')
export class BillingController {
    constructor(private readonly billingService: BillingService) { }

    @Get()
    async findAll() {
        return await this.billingService.findAll()
    }

    @Get(':id')
    async findOne(@Param('id') id: string) {
        return await this.billingService.findOne(id)
    }

    @Post()
    async create(@Body() bill: Billing) {
        return await this.billingService.create(bill)
    }

    @Patch(':id')
    async update(@Param('id') id: string, @Body() bill: Billing) {
        return await this.billingService.update(id, bill)
    }
}
