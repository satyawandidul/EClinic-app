import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { HydratedDocument } from "mongoose";

export type PanchakarmaTransactionsDocument = HydratedDocument<PanchakarmaTransactions>

@Schema()
export class PanchakarmaTransactions {
    @Prop({ type: Number, required: true })
    amountPaid: number

    @Prop({ tyep: Number, required: true })
    balance: number

    @Prop({ type: Date, required: true })
    transactionDate: Date

    @Prop({ type: String, required: true })
    transactionType: string

    @Prop({ type: String, required: true })
    transactionReference: string
}

export const PanchakarmaTransactionsSchema = SchemaFactory.createForClass(PanchakarmaTransactions)