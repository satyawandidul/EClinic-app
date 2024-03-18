import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Medicine, MedicineDocument } from './medicine.schema';

@Injectable()
export class MedicineService {
    constructor(
        @InjectModel(Medicine.name) private readonly MedicineModel: Model<MedicineDocument>
    ) { }

    async findAll() {
        return await this.MedicineModel.find({ isActive: true }).exec()
    }

    async findOne(id: string) {
        return await this.MedicineModel.findOne({ _id: id }).exec()
    }

    async create(medicine: Medicine) {
        const created = new this.MedicineModel(medicine)
        await created.save()
        return created
    }

    async update(id: string, medicine: Medicine) {
        return await this.MedicineModel.findByIdAndUpdate(id, medicine, { new: true })
    }

    async delete(id: string) {
        return await this.MedicineModel.findByIdAndUpdate(id, { isActive: false }, { new: true })
    }
}
