// global
import {
  Actor,
  DatabaseTransactionHandler,
  Item,
  ItemMembership,
  ItemService,
  UnknownExtra,
} from 'graasp';
// local
import { ActionService } from './db-service';
import { BaseActionTask } from './base-action-task';
import { Action } from './interfaces/actions';


/*interface ItemWithMemberships<E extends UnknownExtra> extends Item<E> {
  itemMemberships?: ItemMembership[];
}*/

export class CreateActionTask<E extends UnknownExtra> extends BaseActionTask<Action> {

  readonly action: Action;


  get name(): string {
    return CreateActionTask.name;
  }

  constructor(action: Action, actionService: ActionService) {
    super(actionService);
    this.action = action;
    //this.actionService = actionService;
  }

  async run(handler: DatabaseTransactionHandler): Promise<void> {
    this.status = 'RUNNING';

    // get item
    const actionResult = await this.actionService.create(this.action, handler);
    //if (!item) throw new ItemNotFound(this.targetId);

    // check if item is public
    //const isPublic = await this.publicItemService.hasPublicTag(item, handler);
    //if (!isPublic) throw new ItemNotPublic(this.targetId);

    this._result = actionResult;
    this.status = 'OK';
  }
}