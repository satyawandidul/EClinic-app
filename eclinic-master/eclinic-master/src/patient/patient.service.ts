import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Patient, PatientDocument } from './patient.schema';

@Injectable()
export class PatientService {
    constructor(
        @InjectModel(Patient.name) private readonly patientModel: Model<PatientDocument>
    ) { }

    async findAll() {
        return await this.patientModel.find().exec()
    }

    async findOne(id: string) {
        return await (await this.patientModel.findOne({ _id: id })).populated('visits').exec()
    }

    async create(patient: Patient) {
        const id = await this.getNextId(patient.locationCode)
        patient.patientId = id
        const created = new this.patientModel(patient)
        await created.save()
        return created
    }

    async update(id: string, patient: Patient) {
        return await this.patientModel.findByIdAndUpdate(id, patient, { new: true })
    }

    // Get next user id based on the location
    async getNextId(locationCode: string) {
        // find the last id which contains the specific location
        const currYear = new Date().getFullYear()
        const regex = "^" + locationCode + "-"
        const lastId = await this.patientModel.find({ patientId: { $regex: new RegExp(regex) } }).sort({ "patientId": -1 }).limit(1).select('patientId')
        if (lastId.length > 0) {
            const pid = lastId[0].patientId.split('-')
            const year = pid[1]
            const count = Number(pid[2])
            if (currYear.toString() == year)
                // Increase the count if the year is same
                return locationCode + "-" + currYear + "-" + (count + 1).toString().padStart(4, "0")
            // return the id with 0001
            return locationCode + "-" + currYear + "-0001"
        }
        // no id found.
        return locationCode + "-" + currYear + "-0001"
    }
}
