import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { HydratedDocument } from "mongoose";

export type ChargeDocument = HydratedDocument<Charges>

@Schema()
export class Charges {
    @Prop({ type: Number, required: true })
    followUp: Number

    @Prop({ type: Number, required: true })
    newPatient: Number
}

export const ChargesSchema = SchemaFactory.createForClass(Charges)
ChargesSchema.method('toJSON', function () {
    const { __v, _id, ...object } = this.toObject()
    object.id = _id
    return object
})