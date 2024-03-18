import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { HydratedDocument, model } from "mongoose";

export type BillingDocument = HydratedDocument<Billing>

@Schema()
export class Billing {
    @Prop({ type: String, required: true })
    physicianId: string

    @Prop({ type: String, required: true })
    patientId: string

    @Prop({ type: String, required: true })
    locationId: string

    @Prop({ type: String })
    prescriptionId: string

    @Prop({ type: Number, required: true })
    subTotal: number

    @Prop({ type: Number, required: true })
    discountApplied: number

    @Prop({ type: Number, required: true })
    sgst: number

    @Prop({ type: Number, required: true })
    cgst: number

    @Prop({ type: Number, required: true })
    igst: number

    @Prop({ type: String, required: true })
    paymentMode: string

    @Prop({ type: Number, required: true })
    totalAmount: number

    @Prop({ type: Number, required: true })
    amountPaid: number

    @Prop({ type: Number, required: true })
    balanceAmount: number

    @Prop({ type: String, required: true })
    paymentType: string

    @Prop({ type: String, required: true })
    paymentReference: string

    @Prop({ type: Array<BillDetails>, required: true })
    details: Array<BillDetails>
}

export const BillingSchema = SchemaFactory.createForClass(Billing)
BillingSchema.method('toJSON', function () {
    const { __v, _id, ...object } = this.toObject()
    object.id = _id
    return object
})

// Bill details about each medicine
@Schema()
export class BillDetails {
    @Prop({ type: String, required: true })
    barcode: string

    @Prop({ type: Number, required: true })
    price: number
}