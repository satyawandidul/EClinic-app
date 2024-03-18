import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { HydratedDocument } from "mongoose";

export type LocationDocument = HydratedDocument<Location>

@Schema()
export class Location {
    @Prop({ type: String, required: true })
    name: string

    @Prop({ type: String, required: true })
    address: string

    @Prop({ type: String, required: true, unique: true })
    shortCode: string

    @Prop({ type: Number, required: true })
    pincode: number

    @Prop({ type: String, required: true })
    gstNo: string

    @Prop({ type: Boolean, required: true })
    isFranchaise: boolean

    @Prop({ type: Boolean, required: true })
    isActive: boolean
}

export const LocationSchema = SchemaFactory.createForClass(Location)
LocationSchema.method('toJSON', function () {
    const { __v, _id, ...object } = this.toObject()
    object.id = _id
    object.isActive = (object.isActive === true)? "Yes" : "No"
    object.isFranchaise = (object.isFranchaise === true) ? "Yes" : "No"
    return object
})