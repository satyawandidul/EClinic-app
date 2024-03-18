import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { HydratedDocument } from "mongoose";

export type SrotasDocument = HydratedDocument<Srotas>

@Schema()
export class Srotas {
    @Prop({ type: String, required: true })
    name: string
}

export const SrotasSchema = SchemaFactory.createForClass(Srotas)
SrotasSchema.method('toJSON', function () {
    const { __v, _id, ...object } = this.toObject()
    object.id = _id
    return object
})