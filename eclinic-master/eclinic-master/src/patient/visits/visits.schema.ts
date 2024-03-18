import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose"
import { HydratedDocument } from "mongoose"

export type VisitDocument = HydratedDocument<PatientVisits>

@Schema()
export class PatientVisits {
    @Prop({ type: String, required: true })
    patientId: string

    @Prop({ type: Date, required: true })
    appointment: Date

    @Prop({ type: String, required: true })
    physicianId: string

    @Prop({ type: String, required: true })
    majorComplaints: string

    @Prop({ type: String, required: true })
    diagnosis: string

    @Prop({ type: String, required: true })
    otherHistory: string

    @Prop({ type: String, required: true })
    otherExams: string

    @Prop({ type: Array<String>, required: true })
    pulse: Array<string>

    @Prop({ type: String, required: true })
    investigation: string

    @Prop({ type: Array<string> })
    panchakarma: Array<string>

    @Prop({ type: Date, required: true })
    nextVisit: Date

    @Prop({ type: Number, required: true })
    charges: number

    @Prop({ type: String, required: true })
    locationId: string

    @Prop({ type: Boolean, required: true })
    canBeTestimonial: Boolean
}

export const VisitsSchema = SchemaFactory.createForClass(PatientVisits)
VisitsSchema.method('toJSON', function () {
    const { __v, _id, ...object } = this.toObject()
    object.id = _id
    object.canBeTestimonial = (object.canBeTestimonial ==  true) ? "Yes" : "No"
    return object
})