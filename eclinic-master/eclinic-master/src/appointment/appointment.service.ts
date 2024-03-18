import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Appointment, AppointmentDocument } from './appointment.schema';
import { Patient } from 'src/patient/patient.schema';
import { PatientVisits, VisitDocument } from 'src/patient/visits/visits.schema';

@Injectable()
export class AppointmentService {
    constructor(
        @InjectModel(Appointment.name) private readonly apptModel: Model<AppointmentDocument>,
        @InjectModel(PatientVisits.name) private readonly visitModel: Model<VisitDocument>
    ) { }

    async findAll() {
        // return await this.apptModel.find().exec()
        return await this.apptModel
            .find()
            .populate('location')
            .populate('patient')
            .populate('physician')
            .exec()
    }

    async findOne(id: string) {
        return await this.apptModel.findOne({ _id: id })
            .populate('location')
            .populate('patient')
            .populate('physician')
            .exec()
    }

    // Return only future appointments
    // For each appointment:
    //  1. Get patient ID
    //  2. Query visits collection, get the count
    //  3. If the count is 0, then return new patient charges
    //  4. get the last entry from the visits collection and check the date of the last appointment
    async getApptsByDocId(doctorId: string) {
        const today = new Date()
        console.log(doctorId);
        console.log(today);
        var filter = {
            "physician": doctorId,
            "appt": { $gte: today }
        }
        return await this.apptModel.find(filter)
            .populate('location')
            .populate('patient')
            .populate('physician')
            .exec()
    }

    // Return only future appointments from the specified date.
    async getApptsByDate(date: Date) {
        console.log(date);
        var filter = { "appt": { $gte: date } }
        // return await this.apptModel.find(filter)
        //     .populate('location')
        //     .populate('patient')
        //     .populate('physician').exec()

        const appts = await this.apptModel.find(filter)
            .populate('location', {id: 1, shortCode: 1})
            .populate('patient', { id: 1, patientId: 1, fullname: 1 })
            .populate('physician', { id: 1, username: 1, firstname: 1, lastname: 1})
            .exec()

        appts.forEach(async (appt) => {
            const pString = JSON.stringify(appt.patient)
            const patient = JSON.parse(pString)
            // get the visits
            const visits = await this.visitModel.find({patientId: patient.patientId}).exec()
            if (visits.length > 0) {
             
            }
        })
    }

    async create(appt: Appointment) {
        const created = new this.apptModel(appt)
        await created.save()
        return created
    }

    async update(id: string, appt: Appointment) {
        return await this.apptModel.findByIdAndUpdate(id, appt, { new: true })
    }
}
