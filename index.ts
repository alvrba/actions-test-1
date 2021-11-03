import { FastifyPluginAsync } from "fastify";
import { Item, PreHookHandlerType, PostHookHandlerType, UnknownExtra, Member, IdParam } from "graasp";
import { ItemMembershipNotFound } from "graasp/util/graasp-error";

import { CreateActionTask } from './create-action-task';
import { GetActionsTask } from './get-actions-task';

import { ActionService } from './db-service';
import { Action } from "./interfaces/actions";


export interface GraaspActionsOptions {
  someProperty: string;
}

const actionService = new ActionService();

const plugin: FastifyPluginAsync<GraaspActionsOptions> = async (fastify, options) => {
  const {
    items: { taskManager },
    taskRunner: runner,
    log: defaultLogger,
  } = fastify;


  const createItemTaskName = taskManager.getCreateTaskName();
  runner.setTaskPostHookHandler(createItemTaskName, (item: Partial<Item>, actor, { log, handler }) => {
    console.log("pasaa1");

    const member = actor as Member;

    let action: Action;
    action.memberId = actor.id;
    action.memberType = member.type;
    action.itemId = item.id;
    action.itemType = item.type;
    action.actionType = "create";
    const task = new CreateActionTask(action, actionService);
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



};


export default plugin;