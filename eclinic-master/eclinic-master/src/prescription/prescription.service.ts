import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Prescription, PrescriptionDocument } from './prescription.schema';

@Injectable()
export class PrescriptionService {
    constructor(
        @InjectModel(Prescription.name) private readonly prescriptionModel: Model<PrescriptionDocument>
    ) { }

    async findAll() {
        return await this.prescriptionModel.find().exec()
    }

    async findOne(id: string) {
        return await this.prescriptionModel.findOne({ _id: id }).exec()
    }

    async create(prescription: Prescription) {
        const created = new this.prescriptionModel(prescription)
        await created.save()
        return created
    }

    async update(id: string, prescription: Prescription) {
        return await this.prescriptionModel.findByIdAndUpdate(id, prescription, { new: true })
    }
}
