import { DatabaseTransactionHandler, UnknownExtra } from 'graasp';
import { ActionService } from './db-service';
import { BaseActionTask } from './base-action-task';
import { Action } from './interfaces/actions';
export declare class CreateActionTask<E extends UnknownExtra> extends BaseActionTask<Action> {
    readonly action: Action;
    get name(): string;
    constructor(action: Action, actionService: ActionService);
    run(handler: DatabaseTransactionHandler): Promise<void>;
}
