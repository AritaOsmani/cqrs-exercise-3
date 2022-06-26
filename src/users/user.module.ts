import { Module } from "@nestjs/common";
import { CqrsModule } from "@nestjs/cqrs";

import { MongooseModule } from "@nestjs/mongoose";
import { CommandHandlers } from "./commands/handlers";
import { EventHandlers } from "./events/handlers";
import { UserRead, UserReadSchema } from "./readDb/user-read.entity";
import { UserReadRepository } from "./readDb/user-read.repository";
import { UserSaga } from "./sagas/user.saga";
import { UserController } from "./user.controller";
import { User, UserSchema } from "./writeDb/user.entity";
import { UserWriteRepository } from "./writeDb/user.repository";

@Module({
    imports: [MongooseModule.forFeature([
        { name: User.name, schema: UserSchema, }
    ], 'writeDB'),
    MongooseModule.forFeature([
        { name: UserRead.name, schema: UserReadSchema }
    ], 'readDB'),
        CqrsModule
    ],
    controllers: [UserController],
    providers: [
        UserWriteRepository,
        UserReadRepository,
        ...CommandHandlers,
        ...EventHandlers,
        UserSaga

    ]
})
export class UserModule { }