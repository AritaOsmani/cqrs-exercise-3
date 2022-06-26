import { ConflictException } from "@nestjs/common";
import { CommandHandler, ICommandHandler } from "@nestjs/cqrs";
import { UserReadRepository } from "../../../users/readDb/user-read.repository";
import { CreateReadUserCommand } from "../impl/create-read-user.command";

@CommandHandler(CreateReadUserCommand)
export class CreateReadUserHandler implements ICommandHandler<CreateReadUserCommand>{
    constructor(
        private readonly userRepository: UserReadRepository
    ) { }
    async execute(command: CreateReadUserCommand): Promise<any> {
        const newUser = await this.userRepository.create(command)
        if (!newUser) {
            throw new ConflictException('Something went wrong!')
        }
    }
}