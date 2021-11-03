import { FastifyLoggerInstance } from 'fastify';
import { Actor, DatabaseTransactionHandler } from 'graasp';
import { Task, TaskStatus } from 'graasp';
import { ActionService } from './db-service';
export declare abstract class BaseActionTask<R> implements Task<Actor, R> {
    protected actionService: ActionService;
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
    abstract get name(): string;
    get result(): R;
    get message(): string;
    abstract run(handler: DatabaseTransactionHandler, log: FastifyLoggerInstance): Promise<void | BaseActionTask<R>[]>;
}
