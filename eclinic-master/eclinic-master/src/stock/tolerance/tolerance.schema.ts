import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose"
import { HydratedDocument } from "mongoose"

export type ToleranceDocument = HydratedDocument<Tolerance>

@Schema()
export class Tolerance {
    @Prop({ type: String, required: true })
    medicineName: string

    @Prop({ type: String, required: true })
    locationName: string

    @Prop({ type: Number, required: true })
    lowerLimit: number

    @Prop({ type: Number, required: true })
    upperLimit: number
}

export const ToleranceSchema = SchemaFactory.createForClass(Tolerance)
ToleranceSchema.method('toJSON', function () {
    const { __v, _id, ...object } = this.toObject()
    object.id = _id
    return object
})