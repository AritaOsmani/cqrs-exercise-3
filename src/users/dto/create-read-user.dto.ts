import mongoose from "mongoose";

export class CreateReadUserDto {
    _id: mongoose.Schema.Types.ObjectId
    username: string
}