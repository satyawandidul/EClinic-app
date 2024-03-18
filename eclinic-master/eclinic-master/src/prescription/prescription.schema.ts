import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { HydratedDocument } from "mongoose";

export type PrescriptionDocument = HydratedDocument<Prescription>

@Schema()
export class Prescription {
    @Prop({ type: String, required: true })
    visitId: string

    @Prop({ type: String, required: true })
    locationId: string

    @Prop({ type: Array<PrescriptionData>, required: true })
    prescriptionData: Array<PrescriptionData>
}

export const PrescriptionSchema = SchemaFactory.createForClass(Prescription)
PrescriptionSchema.method('toJSON', function () {
    const { __v, _id, ...object } = this.toObject()
    object.id = _id
    return object
})

export class PrescriptionData {
    @Prop({ type: String, required: true })
    medicineId: string

    @Prop({ type: String })
    morningDose: string

    @Prop({ type: String })
    afternoonDose: string

    @Prop({ type: String })
    eveningDose: string

    @Prop({ type: String })
    nightDose: string

    @Prop({ type: String })
    remark: string

    @Prop({ type: Number, required: true })
    noOfDays: number
}