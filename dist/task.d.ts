import { DatabaseTransactionHandler, UnknownExtra } from 'graasp';
import { ActionService } from './db-service';
import { BaseActionTask } from './base-task';
import { Action } from './interfaces/actions';
export declare class GetActionTask<E extends UnknownExtra> extends BaseActionTask<Action> {
    constructor(actionService: ActionService);
    run(handler: DatabaseTransactionHandler): Promise<void>;
}
