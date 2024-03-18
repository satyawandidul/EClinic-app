import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { IsEmail, IsNumber } from "class-validator";
import mongoose, { HydratedDocument } from "mongoose";
import { PatientVisits } from "./visits/visits.schema";

export type PatientDocument = HydratedDocument<Patient>

@Schema()
export class Patient {
    @Prop({ type: String, required: true, unique: true })
    patientId: string

    @Prop({ type: String })
    photo: string

    @Prop({ type: String, required: true })
    firstname: string

    @Prop({ type: String, required: true })
    middlename: string

    @Prop({ type: String, required: true })
    lastname: string

    @Prop({ type: String, required: true })
    address: string

    @Prop({ type: String, required: true })
    city: string

    @Prop({ type: String, required: true })
    state: string

    @Prop({ type: String, required: true })
    country: string

    @Prop({ type: Number, required: true })
    pincode: number

    @Prop({ type: String, required: true })
    gender: string

    @Prop({ type: String, required: true })
    maritalStatus: string

    @Prop({ type: Date, required: true })
    dateOfBirth: Date

    @Prop({ type: Date })
    anniversaryDate: Date

    @Prop({ type: String, required: true })
    phone: string

    @IsEmail()
    @Prop({ type: String, required: true })
    email: string

    @Prop({ type: String })
    altPhone: string

    @Prop({ type: String })
    altEmail: string

    @Prop({ type: String, required: true })
    occupation: string

    @Prop({ type: String, required: true })
    occupationDetails: string

    @Prop({ type: String, required: true })
    reference: string

    @Prop({ type: String, required: true })
    referenceDetails: string

    @Prop({ type: String, required: true })
    physicianId: string

    @Prop({ type: String, required: true })
    locationCode: string

    @Prop({ type: Number, required: true, default: 0 })
    consultationDiscountPercent: number

    @Prop({ type: Number, required: true, default: 0 })
    medicineDiscountPercent: number

    @Prop({ type: Date, required: true })
    registrationDate: Date

    @Prop({ type: [mongoose.Schema.Types.ObjectId], ref: PatientVisits.name })
    visits: [mongoose.Schema.Types.ObjectId]
}

export const PatientSchema = SchemaFactory.createForClass(Patient)
PatientSchema.method('toJSON', function () {
    const { __v, _id, ...object } = this.toObject()
    object.id = _id
    object.fullname = object.firstname + " " + object.middlename + " " + object.lastname
    return object
})

