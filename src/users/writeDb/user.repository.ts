import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { CreateUserDto } from "../dto/create-user.dto";
import { User, UserInterface } from "./user.entity";

@Injectable()
export class UserWriteRepository {
    constructor(@InjectModel(User.name, 'writeDB') private userModel: Model<UserInterface>) { }

    async create(createUserDto: CreateUserDto): Promise<UserInterface> {
        const newUser = await new this.userModel(createUserDto)
        return newUser.save()
    }
}