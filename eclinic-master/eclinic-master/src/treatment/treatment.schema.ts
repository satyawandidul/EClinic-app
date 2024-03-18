import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { HydratedDocument } from "mongoose";

export type TreatmentDocument = HydratedDocument<Treatment>

@Schema()
export class Treatment {
    @Prop({ type: String, required: true })
    name: string

    @Prop({ type: String, required: true })
    description: string

    @Prop({ type: String, required: true })
    remark: string

    @Prop({ type: Boolean, required: true })
    isActive: boolean
}


export const TreatmentSchema = SchemaFactory.createForClass(Treatment)
TreatmentSchema.method('toJSON', function () {
    const { __v, _id, ...object } = this.toObject()
    object.id = _id
    object.isActive = (object.isActive === true) ? "Yes" : "No"
    return object
})