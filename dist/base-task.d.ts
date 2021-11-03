import { FastifyLoggerInstance } from 'fastify';
import { Actor, DatabaseTransactionHandler, ItemService } from 'graasp';
import { TaskStatus } from 'graasp';
import { ActionService } from './db-service';
export declare abstract class BaseActionTask<R> {
    protected actionService: ActionService;
    protected itemService: ItemService;
    protected _result: R;
    protected _message: string;
    readonly actor: Actor;
    status: TaskStatus;
    targetId: string;
    skip?: boolean;
    input: unknown;
    getInput: () => unknown;
    getResult: () => unknown;
    constructor(actionService: ActionService);
    abstract run(handler: DatabaseTransactionHandler, log: FastifyLoggerInstance): Promise<void | BaseActionTask<R>[]>;
}
