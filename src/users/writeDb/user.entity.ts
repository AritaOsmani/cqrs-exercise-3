import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import mongoose from "mongoose";

@Schema()
export class User {
    @Prop({ required: true })
    username: string

    @Prop({ required: true })
    password: string
}

export interface UserInterface {
    _id?: mongoose.Schema.Types.ObjectId,
    username: string,
    password: string
}

export const UserSchema = SchemaFactory.createForClass(User)