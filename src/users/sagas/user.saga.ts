import { Injectable } from "@nestjs/common";
import { ICommand, ofType, Saga } from "@nestjs/cqrs";
import { map, Observable } from "rxjs";
import { CreateReadUserCommand } from "../commands/impl/create-read-user.command";
import { CreatedUserEvent } from "../events/impl/created-user.event";

@Injectable()
export class UserSaga {
    @Saga()
    createReadUser = (events$: Observable<any>): Observable<ICommand> => {
        return events$.pipe(
            ofType(CreatedUserEvent),
            map((event) => new CreateReadUserCommand(event._id, event.username, event.password))
        )
    }
}