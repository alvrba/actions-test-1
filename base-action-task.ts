// global
import { FastifyLoggerInstance } from 'fastify';
import { Actor, DatabaseTransactionHandler, ItemService } from 'graasp';
import { Task, TaskStatus, Item } from 'graasp';
// local
import { ActionService } from './db-service';
import { Action } from './interfaces/actions';

export abstract class BaseActionTask<R> implements Task<Actor, R> {
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

  constructor(actionService: ActionService) {
    this.actionService = actionService;
    this.status = 'NEW';
  }

  abstract get name(): string;
  get result(): R {
    return this._result;
  }
  get message(): string {
    return this._message;
  }

  abstract run(
    handler: DatabaseTransactionHandler,
    log: FastifyLoggerInstance,
  ): Promise<void | BaseActionTask<R>[]>;
}
