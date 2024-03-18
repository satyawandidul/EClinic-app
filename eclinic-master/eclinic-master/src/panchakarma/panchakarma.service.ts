import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Panchakarma, PanchakarmaDocument } from './panchakarma.schema';

@Injectable()
export class PanchakarmaService {
    constructor(
        @InjectModel(Panchakarma.name) private readonly panchakarmaModel: Model<PanchakarmaDocument>
    ) { }

    async findAll() {
        return await this.panchakarmaModel.find({ isActive: true }).exec()
    }

    async findOne(id: string) {
        return await this.panchakarmaModel.findOne({ _id: id }).exec()
    }

    async create(panchakarma: Panchakarma) {
        const created = new this.panchakarmaModel(panchakarma)
        await created.save()
        return created
    }

    async update(id: string, panchakarma: Panchakarma) {
        return await this.panchakarmaModel.findByIdAndUpdate(id, panchakarma, { new: true })
    }

    async delete(id: string) {
        return await this.panchakarmaModel.findByIdAndUpdate(id, { isActive: false }, { new: true })
    }

}
