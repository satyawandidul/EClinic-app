import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Tolerance, ToleranceDocument } from './tolerance.schema';
import { Model } from 'mongoose';

@Injectable()
export class ToleranceService {
    constructor(@InjectModel(Tolerance.name) private readonly toleranceModel: Model<ToleranceDocument>) { }

    async findAll() {
        return await this.toleranceModel.find().exec()
    }

    async findOne(id: string) {
        return await this.toleranceModel.findOne({ _id: id }).exec();
    }

    async create(tolerance: Tolerance) {
        const created = new this.toleranceModel(tolerance)
        await created.save()
        return created
    }

    async update(id: string, tolerance: Tolerance) {
        return await this.toleranceModel.findByIdAndUpdate(id, tolerance, { new: true })
    }
}
