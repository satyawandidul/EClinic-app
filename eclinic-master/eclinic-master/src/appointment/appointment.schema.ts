import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import mongoose, { HydratedDocument, Mongoose } from "mongoose";
import { Location } from "src/locations/locations.schema";
import { Patient } from "src/patient/patient.schema";
import { User } from "src/users/users.schema";

export type AppointmentDocument = HydratedDocument<Appointment>

@Schema()
export class Appointment {
    // @Prop({ type: String, required: true, })
    // locationCode: string
    @Prop({ type: mongoose.Schema.Types.ObjectId, required: true, ref: Location.name })
    location: mongoose.Schema.Types.ObjectId

    @Prop({ type: mongoose.Schema.Types.ObjectId, required: true, ref: User.name })
    physician: mongoose.Schema.Types.ObjectId

    @Prop({ type: mongoose.Schema.Types.ObjectId, required: true, ref: Patient.name })
    patient: mongoose.Schema.Types.ObjectId

    @Prop({ type: Date, required: true })
    appt: Date

    @Prop({ type: String, required: true })
    status: string   // This is used to track if the patient has arrived etc
}

export const AppointmentSchema = SchemaFactory.createForClass(Appointment)
AppointmentSchema.method('toJSON', function () {
    const { __v, _id, ...object } = this.toObject()
    object.id = _id
    object.appt = new Date(object.appt).toLocaleString()
    return object
})