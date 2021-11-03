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
const create_action_task_1 = require("./create-action-task");
const db_service_1 = require("./db-service");
const actionService = new db_service_1.ActionService();
const plugin = (fastify, options) => __awaiter(void 0, void 0, void 0, function* () {
    const { items: { taskManager }, taskRunner: runner, log: defaultLogger, } = fastify;
    const createItemTaskName = taskManager.getCreateTaskName();
    runner.setTaskPostHookHandler(createItemTaskName, (item, actor, { log, handler }) => {
        console.log("pasaa1");
        const member = actor;
        let action;
        action.memberId = actor.id;
        action.memberType = member.type;
        action.itemId = item.id;
        action.itemType = item.type;
        action.actionType = "create";
        const task = new create_action_task_1.CreateActionTask(action, actionService);
        const result = runner.runSingle(task, log);
        //await task.run(handler);
        //const result = task.result;
        console.log(result);
    });
    /*fastify.get<{ Params: IdParam }>(
      '/items/:id/action',
      { schema: getMetadataSchema },
      async ({ params: { id }, log }) => {
        const task = new GetActionsTask(id, actionService);
        return runner.runSingle(task, log);
      },
    );*/
});
exports.default = plugin;
