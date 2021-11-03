"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.GetActionTask = void 0;
const base_task_1 = require("./base-task");
/*interface ItemWithMemberships<E extends UnknownExtra> extends Item<E> {
  itemMemberships?: ItemMembership[];
}*/
class GetActionTask extends base_task_1.BaseActionTask {
    constructor(actionService) {
        super(actionService);
        this.actionService = actionService;
    }
    run(handler) {
        return __awaiter(this, void 0, void 0, function* () {
            //this.status = 'RUNNING';
            // get item
            const action = yield this.actionService.insertAction(handler);
            //if (!item) throw new ItemNotFound(this.targetId);
            // check if item is public
            //const isPublic = await this.publicItemService.hasPublicTag(item, handler);
            //if (!isPublic) throw new ItemNotPublic(this.targetId);
            this._result = action;
            //this.status = 'OK';
        });
    }
}
exports.GetActionTask = GetActionTask;
