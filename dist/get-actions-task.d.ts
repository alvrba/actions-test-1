import { DatabaseTransactionHandler, UnknownExtra } from 'graasp';
import { ActionService } from './db-service';
import { BaseActionTask } from './base-action-task';
import { Action } from './interfaces/actions';
export declare class GetActionsTask<E extends UnknownExtra> extends BaseActionTask<Action> {
    readonly itemId: string;
    get name(): string;
    constructor(itemId: string, actionService: ActionService);
    run(handler: DatabaseTransactionHandler): Promise<void>;
}
