import mongoose from "mongoose";

export class CreatedUserEvent {
    constructor(
        public readonly _id: mongoose.Schema.Types.ObjectId,
        public readonly username: string,
        public readonly password: string
    ) { }
}