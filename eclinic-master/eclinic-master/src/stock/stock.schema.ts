import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { HydratedDocument } from "mongoose";
import { Tolerance } from "./tolerance/tolerance.schema";

export type StockDocument = HydratedDocument<Stock>


@Schema()
export class Stock {

    @Prop({ type: String, required: true })
    locationShortCode: string

    // @Prop({ type: Array<Tolerance>, required: true })
    // medTolerances: Array<Tolerance>

    @Prop({ type: Array<Inventory>, required: true })
    inventory: Array<Inventory>
}

export const StockSchema = SchemaFactory.createForClass(Stock)
StockSchema.method('toJSON', function () {
    const { __v, _id, ...object } = this.toObject()
    object.id = _id
    return object
})


export type InventoryDocument = HydratedDocument<Inventory>

@Schema()
export class Inventory {
    @Prop({ type: String, required: true, unique: true })
    barcode: string

    @Prop({ type: String, required: true })
    medicineName: string

    @Prop({ type: Number, required: true })
    price: number

    @Prop({ type: Boolean, required: true })
    isAvailable: boolean

    @Prop({ type: Boolean, required: true })
    isInTransit: boolean
}

export const InventorySchema = SchemaFactory.createForClass(Inventory)