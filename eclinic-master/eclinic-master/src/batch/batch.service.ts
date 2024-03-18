import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Batch } from './batch.schema';

@Injectable()
export class BatchService {
    constructor(@InjectModel(Batch.name) private readonly batchModel: Model<Batch>) { }


    async findAll() {
        return await this.batchModel.find({ isActive: true }).exec()
    }

    async findOne(id: string) {
        return await this.batchModel.findOne({ _id: id }).exec()
    }

    async create(batch: Batch) {
        const created = new this.batchModel(batch)
        await created.save()
        return created
    }

    async update(id: string, batch: Batch) {
        return await this.batchModel.findByIdAndUpdate(id, batch, { new: true })
    }

    async delete(id: string) {
        return await this.batchModel.findByIdAndUpdate(id, { isActive: false }, { new: true })
    }
}
