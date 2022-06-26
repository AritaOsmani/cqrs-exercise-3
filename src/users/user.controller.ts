import { Body, Controller, Post } from "@nestjs/common";
import { CommandBus, QueryBus } from "@nestjs/cqrs";
import { CreateUserCommand } from "./commands/impl/create-user.command";
import { CreateUserDto } from "./dto/create-user.dto";

@Controller('user')
export class UserController {
    constructor(
        private readonly commandBus: CommandBus,
        private readonly queryBus: QueryBus
    ) { }

    @Post('/signup')
    async signUp(@Body() createUserDto: CreateUserDto) {
        return await this.commandBus.execute(new CreateUserCommand(createUserDto.username, createUserDto.password))
    }
}