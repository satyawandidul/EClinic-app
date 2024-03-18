import { Injectable } from '@nestjs/common';
import { InjectConnection, InjectModel } from '@nestjs/mongoose';
import { PatientVisits, VisitDocument } from './visits.schema';
import { Model } from 'mongoose';

@Injectable()
export class VisitsService {
    constructor(
        @InjectModel(PatientVisits.name) private readonly patientVisitModel: Model<VisitDocument>
    ) { }

    // Get all the visits related to patient, return patient details ?
    async getVisits(patientId: string) {
        return await this.patientVisitModel.find({ patientId: patientId }).exec()
    }

    // Create visit entry
    async create(visit: PatientVisits) {
        const created = new this.patientVisitModel(visit)
        await created.save()
        return created
    }

    async updateTestimonial(visitId: string, value: boolean) {
        return this.patientVisitModel.findByIdAndUpdate(visitId, { canBeTestimonial: value }, { new: true })
    }


    async update(visitId: string, visit: PatientVisits) {
        return this.patientVisitModel.findByIdAndUpdate(visitId, visit, { new: true })
    }
}
