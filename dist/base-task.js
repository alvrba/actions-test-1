"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BaseActionTask = void 0;
class BaseActionTask {
    constructor(actionService) {
        this.actionService = actionService;
        this.status = 'NEW';
    }
}
exports.BaseActionTask = BaseActionTask;
