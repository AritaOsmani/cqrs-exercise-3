import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { CreateReadUserDto } from "../dto/create-read-user.dto";
import { UserRead, UserReadInterface } from "./user-read.entity";

@Injectable()
export class UserReadRepository {
    constructor(
        @InjectModel(UserRead.name, 'readDB') private userModel: Model<UserReadInterface>
    ) { }
    async create(createReadUserDto: CreateReadUserDto) {
        const newUser = new this.userModel(createReadUserDto)
        return await newUser.save()
    }
}