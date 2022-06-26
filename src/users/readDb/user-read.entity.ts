import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import mongoose from "mongoose";

@Schema({ timestamps: true })
export class UserRead {
    @Prop({ required: true })
    username: string
}
export interface UserReadInterface {
    _id?: mongoose.Schema.Types.ObjectId,
    username: string
}

export const UserReadSchema = SchemaFactory.createForClass(UserRead)