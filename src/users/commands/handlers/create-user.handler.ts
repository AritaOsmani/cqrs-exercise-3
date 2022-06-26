import { ConflictException } from "@nestjs/common";
import { CommandHandler, EventBus, ICommandHandler } from "@nestjs/cqrs";
import { CreatedUserEvent } from "../../../users/events/impl/created-user.event";
import { UserWriteRepository } from "../../../users/writeDb/user.repository";
import { CreateUserCommand } from "../impl/create-user.command";

@CommandHandler(CreateUserCommand)
export class CreateUserHandler implements ICommandHandler<CreateUserCommand>{
    constructor(
        private readonly userRepository: UserWriteRepository,
        private readonly eventBus: EventBus
    ) { }
    async execute(command: CreateUserCommand): Promise<any> {
        const newUser = await this.userRepository.create(command)
        //throw event
        this.eventBus.publish(new CreatedUserEvent(newUser._id, command.username, command.password))
        if (!newUser) {
            throw new ConflictException('Something went wrong.User was not created!')
        }
    }
}