import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Billing, BillingDocument } from './billing.schema';

@Injectable()
export class BillingService {
    constructor(@InjectModel(Billing.name) private readonly billingModel: Model<BillingDocument>) { }

    async findAll() {
        return await this.billingModel.find().exec()
    }

    async findOne(id: string) {
        return await this.billingModel.find({ _id: id }).exec()
    }

    async create(billing: Billing) {
        const created = new this.billingModel(billing)
        await created.save()
        return created
    }

    async update(id: string, billing: Billing) {
        return this.billingModel.findByIdAndUpdate(id, billing, { new: true })
    }
}
