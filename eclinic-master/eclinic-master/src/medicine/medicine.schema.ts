import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { HydratedDocument } from "mongoose";


export type MedicineDocument = HydratedDocument<Medicine>

@Schema()
export class Medicine {
    @Prop({ type: String, required: true })
    name: string

    @Prop({ type: String, required: true })
    type: string

    @Prop({ type: String, required: true, unique: true })
    shortCode: string

    @Prop({ type: Number, required: true })
    bottleQty: number

    @Prop({ type: Boolean, required: true })
    isDiscountApplicable: boolean

    @Prop({ type: String, required: true })
    hsnCode: string

    @Prop({ type: Number, required: true })
    sgst: number

    @Prop({ type: Number, required: true })
    cgst: number

    @Prop({ type: Number, required: true })
    igst: number

    @Prop({ type: Number, required: true })
    franchaiseDiscount: number

    @Prop({ type: String, required: true })
    morningDose: string

    @Prop({ type: String, required: true })
    afternoonDose: string

    @Prop({ type: String, required: true })
    eveningDose: string

    @Prop({ type: String, required: true })
    nightDose: string

    @Prop({ type: String, required: true })
    unitOfMeasure: string

    @Prop({ type: String, required: true })
    remark: string

    @Prop({ type: Boolean, required: true })
    isActive: boolean
}

export const MedicineSchema = SchemaFactory.createForClass(Medicine)
MedicineSchema.method('toJSON', function () {
    const { __v, _id, ...object } = this.toObject()
    object.id = _id
    object.isActive = (object.isActive === true) ? "Yes" : "No"
    object.isDiscountApplicable = (object.isDiscountApplicable === true) ? "Yes" : "No"
    return object
})