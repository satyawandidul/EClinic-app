import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { HydratedDocument } from "mongoose";

export type PulseDocument = HydratedDocument<Pulse>

@Schema()
export class Pulse {
    @Prop({ type: String, required: true })
    name: string
}

export const PulseSchema = SchemaFactory.createForClass(Pulse)
PulseSchema.method('toJSON', function () {
    const { __v, _id, ...object } = this.toObject()
    object.id = _id
    return object
})