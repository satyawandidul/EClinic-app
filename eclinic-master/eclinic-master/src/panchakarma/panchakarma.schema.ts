import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { HydratedDocument } from "mongoose";

export type PanchakarmaDocument = HydratedDocument<Panchakarma>

@Schema()
export class Panchakarma {
    @Prop({ type: String, required: true })
    name: string

    @Prop({ type: String, required: true })
    description: string

    @Prop({ type: Number, required: true })
    price: Number

    @Prop({ type: Number, required: true })
    noOfTreatments: Number

    @Prop({ type: Boolean, required: true })
    isActive: boolean
}

export const PanchakarmaSchema = SchemaFactory.createForClass(Panchakarma)
PanchakarmaSchema.method('toJSON', function () {
    const { __v, _id, ...object } = this.toObject()
    object.id = _id
    object.isActive = (object.isActive === true) ? "Yes" : "No"
    return object
})