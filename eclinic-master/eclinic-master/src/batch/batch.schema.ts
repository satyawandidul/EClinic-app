import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { HydratedDocument } from "mongoose";


export type BatchDocument = HydratedDocument<Batch>

@Schema()
export class Batch {
    @Prop({ type: String, required: true, unique: true })
    batchNo: string

    @Prop({ type: String, required: true })
    medicineName: string

    @Prop({ type: Number, required: true })
    quantity: number

    @Prop({ type: String, required: true })
    description: string

    @Prop({ type: Number, required: true })
    price: number

    @Prop({ type: Boolean, required: true })
    isActive: true

    @Prop({ type: Boolean, required: true })
    isCanceled: true
}

export const BatchSchema = SchemaFactory.createForClass(Batch)
BatchSchema.method('toJSON', function () {
    const { __v, _id, ...object } = this.toObject()
    object.id = _id
    object.isActive = (object.isActive === true) ? "Yes" : "No"
    object.isCanceled = (object.isCanceled === true) ? "Yes" : "No"
    return object
})