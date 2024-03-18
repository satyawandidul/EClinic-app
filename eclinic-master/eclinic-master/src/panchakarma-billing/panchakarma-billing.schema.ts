import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import mongoose, { HydratedDocument } from "mongoose";
import { PanchakarmaTransactions } from "./transactions/transactions.schema";

export type PanchakarmaBillingDocument = HydratedDocument<PanchakarmaBilling>

@Schema()
export class PanchakarmaBilling {
    // Change it to reference object
    @Prop({ type: String, required: true })
    patientId: string

    @Prop({ type: String, required: true })
    primaryDetox: string

    @Prop({ type: String, required: true })
    secondaryDetox: string

    @Prop({ type: Boolean, required: true })
    isDetoxComplete: boolean

    @Prop({ type: [mongoose.Schema.Types.ObjectId], ref: PanchakarmaTransactions.name })
    transactions: [mongoose.Schema.Types.ObjectId]
}

export const PanchakarmaBillingSchema = SchemaFactory.createForClass(PanchakarmaBilling)
PanchakarmaBillingSchema.method('toJSON', function () {
    const { __v, _id, ...object } = this.toObject()
    object.id = _id
    object.isDetoxComplete = (object.isDetoxComplete === true) ? "Yes" : "No"
    return object
})
