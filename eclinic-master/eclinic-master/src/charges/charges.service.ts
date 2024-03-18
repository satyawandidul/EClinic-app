import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { ChargeDocument, Charges } from './charges.schema';

@Injectable()
export class ChargesService {
    constructor(
        @InjectModel(Charges.name) private readonly chargesModel: Model<ChargeDocument>
    ) { }

    async findAll() {
        return await this.chargesModel.find().exec()
    }

    async findOne(id: string) {
        return await this.chargesModel.findOne({ _id: id }).exec()
    }

    async create(charges: Charges) {
        // Check if the collection is empty
        const count = await this.chargesModel.countDocuments()
        if (count > 0) {
            return this.chargesModel.findOne()
        }
        const created = new this.chargesModel(charges)
        await created.save()
        return created
    }

    async update(id: string, charges: Charges) {
        return await this.chargesModel.findByIdAndUpdate(id, charges, { new: true })
    }
}
