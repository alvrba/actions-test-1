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

export class GetActionsByActionType<E extends UnknownExtra> extends BaseActionTask<Action> {

  readonly itemId: string;


  get name(): string {
    return GetActionsByActionType.name;
  }

  constructor(itemId: string, actionService: ActionService) {
    super(actionService);
    this.itemId = itemId;
    //this.actionService = actionService;
  }

  async run(handler: DatabaseTransactionHandler): Promise<void> {
    this.status = 'RUNNING';

    // get item
    const actionResult = await this.actionService.getActionsByActionType(this.itemId, handler);
    //if (!item) throw new ItemNotFound(this.targetId);

    // check if item is public
    //const isPublic = await this.publicItemService.hasPublicTag(item, handler);
    //if (!isPublic) throw new ItemNotPublic(this.targetId);

    this._result = actionResult;
    this.status = 'OK';
  }
}