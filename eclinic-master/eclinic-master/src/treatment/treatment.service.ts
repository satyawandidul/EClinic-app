import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Treatment, TreatmentDocument } from './treatment.schema';
import { Model } from 'mongoose';

@Injectable()
export class TreatmentService {
    constructor(@InjectModel(Treatment.name) private readonly treatmentModel: Model<TreatmentDocument>) { }

    async findAll() {
        return await this.treatmentModel.find({ isActive: true }).exec()
    }

    async findOne(id: string) {
        return await this.treatmentModel.findOne({ _id: id }).exec
    }

    async create(treatment: Treatment) {
        const created = new this.treatmentModel(treatment)
        await created.save()
        return created
    }

    async update(id: string, treatment: Treatment) {
        return await this.treatmentModel.findByIdAndUpdate(id, treatment, { new: true })
    }

    async delete(id: string) {
        return await this.treatmentModel.findByIdAndUpdate(id, { isActive: false }, { new: true })
    }
}
