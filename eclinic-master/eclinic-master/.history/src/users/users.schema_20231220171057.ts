import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { IsEmail } from "class-validator";
import { HydratedDocument } from "mongoose";
import { UsersController } from "./users.controller";

export type UserDocument = HydratedDocument<User>

@Schema()
export class User {
    @Prop({ type: String, required: true })
    firstname: string

    @Prop({ type: String, required: true })
    lastname: string

    @Prop({ type: String, required: true, unique: true })
    username: string

    @Prop({ type: String, required: true })
    @IsEmail()
    email: string

    @Prop({ type: String, required: true })
    phone: string

    @Prop({ type: String, required: true })
    password: string

    // This will have the roles as Reception: true, Stockist: true etc
    // Need to handle this in front end as well along with JWT.
    @Prop({ type: Object, required: true })
    role: object

    @Prop({ type: String, required: true })
    locationCode: string

    @Prop({ type: Boolean, required: true })
    isActive: boolean


    @Prop({ type: String })
    base64: string
}

export const UserSchema = SchemaFactory.createForClass(User)
UserSchema.method('toJSON', function () {
    const { __v, _id, ...object } = this.toObject()
    object.id = _id
    object.fullname = object.firstname + " " + object.lastname
    object.isActive = (object.isActive === true) ? "Yes" : "No"
    return object
})
